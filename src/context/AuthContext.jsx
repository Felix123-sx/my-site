import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

async function fetchProfile(userId) {
  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at, updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  async function hydrateAuth(nextSession) {
    setSession(nextSession);
    const nextUser = nextSession?.user ?? null;
    setUser(nextUser);

    if (!nextUser) {
      setProfile(null);
      setAuthLoading(false);
      return;
    }

    try {
      const nextProfile = await fetchProfile(nextUser.id);
      setProfile(nextProfile);
    } catch (error) {
      setAuthError(error.message || "Failed to load profile.");
    } finally {
      setAuthLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function loadInitialSession() {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
        return;
      }

      if (mounted) {
        await hydrateAuth(data.session);
      }
    }

    void loadInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        void hydrateAuth(nextSession);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signUp({ email, password, fullName }) {
    setAuthError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    return data;
  }

  async function signIn({ email, password }) {
    setAuthError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    return data;
  }

  async function signOut() {
    setAuthError("");
    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  async function sendPasswordReset(email) {
    setAuthError("");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  async function resendConfirmation(email) {
    setAuthError("");
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    return data;
  }

  async function updatePassword(password) {
    setAuthError("");
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    return data;
  }

  async function updateProfile(updates) {
    if (!user) {
      throw new Error("Not authenticated.");
    }

    setAuthError("");
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: updates.fullName,
      })
      .eq("id", user.id)
      .select("id, email, full_name, role, created_at, updated_at")
      .single();

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    setProfile(data);
    return data;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userId: user?.id || null,
        profile,
        authLoading,
        authError,
        isAuthenticated: Boolean(user),
        signUp,
        signIn,
        signOut,
        sendPasswordReset,
        resendConfirmation,
        updatePassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
