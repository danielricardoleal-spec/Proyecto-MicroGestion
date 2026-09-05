import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role, mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginWithFace: () => { success: boolean; user?: User; error?: string };
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
  registerFace: (userId: string) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // In-memory user store — swap for API/DB calls later
  const [users, setUsers] = useState<User[]>(mockUsers);

  function login(email: string, password: string) {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Correo o contraseña incorrectos' };
    setUser(found);
    return { success: true };
  }

  function loginWithFace() {
    // Stub: real implementation connects to face recognition API
    // Simulates finding the first user with faceRegistered = true
    const found = users.find(u => u.faceRegistered);
    if (!found) return { success: false, error: 'No hay rostros registrados en el sistema' };
    setUser(found);
    return { success: true, user: found };
  }

  function register(data: RegisterData) {
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
    setUser(newUser);
    return { success: true };
  }

  function registerFace(userId: string) {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, faceRegistered: true } : u));
    setUser(prev => prev?.id === userId ? { ...prev, faceRegistered: true } : prev);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, users, login, loginWithFace, register, logout, registerFace }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
