import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, mockUsers } from '../data/mockData';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: RegisterData) => { success: boolean; error?: string; user?: User };
  logout: () => void;
  registerFace: (userId: string) => void;
  loginWithFace: () => { success: boolean; error?: string; user?: User };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('microgestion_users');
    return saved ? JSON.parse(saved) : mockUsers;
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('microgestion_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('microgestion_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('microgestion_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('microgestion_current_user');
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: 'Correo o contraseña incorrectos' };
    }
    setUser(found);
    return { success: true };
  };

  const register = (data: RegisterData) => {
    if (users.find(u => u.email === data.email)) {
      return { success: false, error: 'Este correo ya está registrado' };
    }

    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      faceRegistered: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('microgestion_current_user');
  };

  const registerFace = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, faceRegistered: true } : u));
    // Actualizar también el usuario actual si coincide
    setUser(prev => prev && prev.id === userId ? { ...prev, faceRegistered: true } : prev);
  };

 const loginWithFace = () => {
    const registeredUsers = users.filter(u => u.faceRegistered);
    if (registeredUsers.length === 0) {
      return { success: false, error: 'No hay rostros registrados en el sistema' };
    }
    
    const faceUser = registeredUsers[registeredUsers.length - 1];
    
    setUser(faceUser);
    return { success: true, user: faceUser };
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, registerFace, loginWithFace }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}