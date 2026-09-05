export type Role = 'admin' | 'vendedor' | 'inventario' | 'rrhh';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
  faceRegistered: boolean;
  createdAt: string;
}

// Simulated user database — replace with real DB later
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Ramírez',
    email: 'admin@microge.com',
    password: '123456',
    role: 'admin',
    faceRegistered: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Valeria Torres',
    email: 'ventas@microge.com',
    password: '123456',
    role: 'vendedor',
    faceRegistered: false,
    createdAt: '2024-02-10',
  },
  {
    id: '3',
    name: 'Miguel Soto',
    email: 'inventario@microge.com',
    password: '123456',
    role: 'inventario',
    faceRegistered: false,
    createdAt: '2024-02-20',
  },
  {
    id: '4',
    name: 'Ana Flores',
    email: 'rrhh@microge.com',
    password: '123456',
    role: 'rrhh',
    faceRegistered: false,
    createdAt: '2024-03-01',
  },
];

export const salesData = [
  { mes: 'Ene', ventas: 42000, meta: 40000 },
  { mes: 'Feb', ventas: 38500, meta: 40000 },
  { mes: 'Mar', ventas: 51200, meta: 45000 },
  { mes: 'Abr', ventas: 47800, meta: 45000 },
  { mes: 'May', ventas: 53400, meta: 50000 },
  { mes: 'Jun', ventas: 61000, meta: 55000 },
  { mes: 'Jul', ventas: 58700, meta: 55000 },
];

export const products = [
  { id: 'P001', nombre: 'Laptop Dell XPS 15', categoria: 'Tecnología', stock: 23, precio: 1250000, alerta: false },
  { id: 'P002', nombre: 'Monitor Samsung 27"', categoria: 'Tecnología', stock: 8, precio: 420000, alerta: true },
  { id: 'P003', nombre: 'Teclado Mecánico K70', categoria: 'Periféricos', stock: 45, precio: 89000, alerta: false },
  { id: 'P004', nombre: 'Mouse Logitech MX3', categoria: 'Periféricos', stock: 3, precio: 65000, alerta: true },
  { id: 'P005', nombre: 'Silla Ergonómica Pro', categoria: 'Muebles', stock: 12, precio: 380000, alerta: false },
  { id: 'P006', nombre: 'Escritorio Standing', categoria: 'Muebles', stock: 6, precio: 520000, alerta: true },
  { id: 'P007', nombre: 'Auriculares Sony WH-1000', categoria: 'Audio', stock: 18, precio: 195000, alerta: false },
  { id: 'P008', nombre: 'Webcam Logitech 4K', categoria: 'Periféricos', stock: 2, precio: 145000, alerta: true },
];

export const recentSales = [
  { id: 'V2024-0891', cliente: 'Empresa Alfa SA', producto: 'Laptop Dell XPS 15', monto: 2500000, vendedor: 'Valeria Torres', fecha: '2024-07-15', estado: 'completada' },
  { id: 'V2024-0890', cliente: 'Consultora Beta', producto: 'Monitor Samsung 27"', monto: 840000, vendedor: 'Pedro Nieto', fecha: '2024-07-15', estado: 'completada' },
  { id: 'V2024-0889', cliente: 'Tienda Gamma', producto: 'Silla Ergonómica Pro', monto: 1140000, vendedor: 'Valeria Torres', fecha: '2024-07-14', estado: 'pendiente' },
  { id: 'V2024-0888', cliente: 'Startup Delta', producto: 'Teclado Mecánico K70', monto: 267000, vendedor: 'Marco Luna', fecha: '2024-07-14', estado: 'completada' },
  { id: 'V2024-0887', cliente: 'Corp Epsilon', producto: 'Escritorio Standing', monto: 1040000, vendedor: 'Pedro Nieto', fecha: '2024-07-13', estado: 'cancelada' },
];

export const workers = [
  { id: 'T001', nombre: 'Valeria Torres', cargo: 'Vendedor', departamento: 'Ventas', email: 'v.torres@microge.com', estado: 'activo', ingreso: '2023-03-15', sueldo: 850000 },
  { id: 'T002', nombre: 'Miguel Soto', cargo: 'Encargado Inventario', departamento: 'Operaciones', email: 'm.soto@microge.com', estado: 'activo', ingreso: '2023-06-01', sueldo: 780000 },
  { id: 'T003', nombre: 'Ana Flores', cargo: 'RRHH', departamento: 'Recursos Humanos', email: 'a.flores@microge.com', estado: 'activo', ingreso: '2022-11-10', sueldo: 900000 },
  { id: 'T004', nombre: 'Pedro Nieto', cargo: 'Vendedor', departamento: 'Ventas', email: 'p.nieto@microge.com', estado: 'activo', ingreso: '2023-08-20', sueldo: 820000 },
  { id: 'T005', nombre: 'Marco Luna', cargo: 'Vendedor', departamento: 'Ventas', email: 'm.luna@microge.com', estado: 'licencia', ingreso: '2024-01-05', sueldo: 800000 },
  { id: 'T006', nombre: 'Sofia Vega', cargo: 'Contadora', departamento: 'Finanzas', email: 's.vega@microge.com', estado: 'activo', ingreso: '2022-05-12', sueldo: 1100000 },
];

export const attendance = [
  { trabajador: 'Valeria Torres', lunes: true, martes: true, miercoles: true, jueves: true, viernes: true },
  { trabajador: 'Miguel Soto', lunes: true, martes: true, miercoles: false, jueves: true, viernes: true },
  { trabajador: 'Pedro Nieto', lunes: true, martes: false, miercoles: true, jueves: true, viernes: true },
  { trabajador: 'Marco Luna', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false },
  { trabajador: 'Sofia Vega', lunes: true, martes: true, miercoles: true, jueves: false, viernes: true },
];

export const stockMovements = [
  { fecha: '2024-07-15', producto: 'Laptop Dell XPS 15', tipo: 'entrada', cantidad: 10, motivo: 'Reposición stock', responsable: 'Miguel Soto' },
  { fecha: '2024-07-15', producto: 'Mouse Logitech MX3', tipo: 'salida', cantidad: 5, motivo: 'Venta V2024-0891', responsable: 'Valeria Torres' },
  { fecha: '2024-07-14', producto: 'Monitor Samsung 27"', tipo: 'salida', cantidad: 2, motivo: 'Venta V2024-0890', responsable: 'Pedro Nieto' },
  { fecha: '2024-07-14', producto: 'Teclado Mecánico K70', tipo: 'entrada', cantidad: 20, motivo: 'Compra a proveedor', responsable: 'Miguel Soto' },
  { fecha: '2024-07-13', producto: 'Webcam Logitech 4K', tipo: 'salida', cantidad: 1, motivo: 'Devolución a proveedor', responsable: 'Miguel Soto' },
];

export const aiRecommendations = [
  {
    tipo: 'alerta',
    titulo: 'Stock crítico detectado',
    mensaje: 'Mouse Logitech MX3 tiene solo 3 unidades. Historial indica ventas promedio de 8 unidades/semana. Se recomienda reordenar urgente.',
    accion: 'Crear orden de compra',
    prioridad: 'alta',
  },
  {
    tipo: 'oportunidad',
    titulo: 'Tendencia de ventas positiva',
    mensaje: 'Las ventas de Julio superan en 11% la meta mensual. Los productos de Tecnología lideran con 62% del revenue total.',
    accion: 'Ver reporte detallado',
    prioridad: 'media',
  },
  {
    tipo: 'rendimiento',
    titulo: 'Vendedor destacado',
    mensaje: 'Valeria Torres lleva $3.64M en ventas este mes, superando su meta en 28%. Considerar incentivo o reconocimiento.',
    accion: 'Ver perfil',
    prioridad: 'baja',
  },
  {
    tipo: 'alerta',
    titulo: 'Ausentismo elevado',
    mensaje: 'Marco Luna acumula 5 días de inasistencia esta semana. Requiere seguimiento por parte de RRHH.',
    accion: 'Notificar a RRHH',
    prioridad: 'alta',
  },
];

export const schedules = [
  { trabajador: 'Valeria Torres', turno: 'Mañana', entrada: '08:00', salida: '17:00', dias: 'Lun–Vie' },
  { trabajador: 'Pedro Nieto', turno: 'Mañana', entrada: '08:00', salida: '17:00', dias: 'Lun–Vie' },
  { trabajador: 'Marco Luna', turno: 'Tarde', entrada: '13:00', salida: '22:00', dias: 'Mar–Sáb' },
  { trabajador: 'Miguel Soto', turno: 'Mañana', entrada: '07:30', salida: '16:30', dias: 'Lun–Vie' },
  { trabajador: 'Sofia Vega', turno: 'Mañana', entrada: '09:00', salida: '18:00', dias: 'Lun–Vie' },
];
