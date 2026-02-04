import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/DashboardHome';
import PageList from './pages/PageList';
import PageEditor from './pages/PageEditor';
import UserList from './pages/UserList';
import UserEditor from './pages/UserEditor';
import Configuracoes from './pages/Configuracoes';
import Login from './pages/Login';
import Financeiro from './pages/Financeiro';
import ProtectedRoute from '../components/ProtectedRoute';

const PainelRoutes = () => {
    return (
        <Routes>
            {/* Public Login Route */}
            <Route path="login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            }>
                <Route index element={<DashboardHome />} />
                <Route path="paginas" element={<PageList />} />
                <Route path="paginas/nova" element={<PageEditor />} />
                <Route path="paginas/editar/:id" element={<PageEditor />} />
                <Route path="usuarios" element={<UserList />} />
                <Route path="usuarios/novo" element={<UserEditor />} />
                <Route path="usuarios/editar/:id" element={<UserEditor />} />
                <Route path="usuarios/editar/:id" element={<UserEditor />} />
                <Route path="financeiro" element={<Financeiro />} />
                <Route path="configuracoes" element={<Configuracoes />} />
                <Route path="*" element={<Navigate to="/painel" replace />} />
            </Route>
        </Routes>
    );
};

export default PainelRoutes;
