import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'MAHASISWA' | 'ADMIN';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for session
    const session = localStorage.getItem('simfora_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem('simfora_session');
      }
    }
  }, []);

  const login = async (email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication logic
        if (email === 'admin@telkomuniversity.ac.id' && pass === 'admin123') {
          const adminUser: User = { id: '1', name: 'Admin Logistik', email, role: 'ADMIN' };
          setUser(adminUser);
          localStorage.setItem('simfora_session', JSON.stringify(adminUser));
          resolve();
        } else if (email.endsWith('@student.telkomuniversity.ac.id')) {
          // If any student email, we just let them in for the mock
          const mockUsers = JSON.parse(localStorage.getItem('simfora_users') || '[]');
          const existingUser = mockUsers.find((u: any) => u.email === email && u.password === pass);
          
          if (existingUser) {
            const studentUser: User = { id: existingUser.id, name: existingUser.name, email, role: 'MAHASISWA' };
            setUser(studentUser);
            localStorage.setItem('simfora_session', JSON.stringify(studentUser));
            resolve();
          } else {
            reject(new Error('Email atau password salah!'));
          }
        } else {
          reject(new Error('Gunakan email @student.telkomuniversity.ac.id'));
        }
      }, 800);
    });
  };

  const register = async (name: string, email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!email.endsWith('@student.telkomuniversity.ac.id') && !email.endsWith('@telkomuniversity.ac.id')) {
          reject(new Error('Registrasi hanya untuk email Telkom University'));
          return;
        }

        const mockUsers = JSON.parse(localStorage.getItem('simfora_users') || '[]');
        if (mockUsers.some((u: any) => u.email === email)) {
          reject(new Error('Email sudah terdaftar'));
          return;
        }

        const newUser = { id: Date.now().toString(), name, email, password: pass };
        mockUsers.push(newUser);
        localStorage.setItem('simfora_users', JSON.stringify(mockUsers));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simfora_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
