import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedSession = localStorage.getItem('edumentor_session');
    if (savedSession) {
      try {
        const userData = JSON.parse(savedSession);
        setUser(userData);
      } catch (e) {
        console.error('Failed to parse saved session', e);
        localStorage.removeItem('edumentor_session');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Check if user is registered in localStorage
    const users = JSON.parse(localStorage.getItem('edumentor_users') || '[]');
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      throw new Error('User not found. Please register.');
    }

    if (foundUser.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    // Set active session (omit password for security)
    const { password: _, ...sessionUser } = foundUser;
    localStorage.setItem('edumentor_session', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('edumentor_users') || '[]');
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      joinedAt: new Date().toISOString(),
      studyGoal: '2 hours',
      preferredSubject: 'Python'
    };

    users.push(newUser);
    localStorage.setItem('edumentor_users', JSON.stringify(users));

    // Automatically log user in
    const { password: _, ...sessionUser } = newUser;
    localStorage.setItem('edumentor_session', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  const logout = () => {
    localStorage.removeItem('edumentor_session');
    setUser(null);
  };

  const updateProfile = (updatedDetails) => {
    if (!user) return;

    const updatedUser = { ...user, ...updatedDetails };
    
    // Update current session
    localStorage.setItem('edumentor_session', JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Update users database
    const users = JSON.parse(localStorage.getItem('edumentor_users') || '[]');
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, ...updatedDetails };
      }
      return u;
    });
    localStorage.setItem('edumentor_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
