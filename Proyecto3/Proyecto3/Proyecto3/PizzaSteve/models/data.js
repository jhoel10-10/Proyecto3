// Datos de pizzas y promociones
const pizzaData = {
    pizzas: [
        {
            id: 1,
            name: 'Margarita Clásica',
            description: 'Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva',
            price: 45.00,
            img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
        },
        {
            id: 2,
            name: 'Pepperoni Suprema',
            description: 'Doble pepperoni, queso mozzarella y salsa especial',
            price: 55.00,
            img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop'
        },
        {
            id: 3,
            name: 'Hawaiana Tropical',
            description: 'Jamón, piña, queso mozzarella y salsa BBQ',
            price: 50.00,
            img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop'
        },
        {
            id: 4,
            name: 'Cuatro Quesos',
            description: 'Mozzarella, parmesano, gorgonzola y queso de cabra',
            price: 60.00,
            img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop'
        },
        {
            id: 5,
            name: 'Vegetariana Deluxe',
            description: 'Pimientos, champiñones, aceitunas, cebolla y tomate',
            price: 48.00,
            img: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop'
        },
        {
            id: 6,
            name: 'Carnívora Especial',
            description: 'Pepperoni, salchicha, jamón, tocino y carne molida',
            price: 65.00,
            img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop'
        }
    ],
    promotions: [
        {
            id: 1,
            title: '2x1 en Pizzas Medianas',
            description: 'Compra una pizza mediana y llévate otra completamente gratis. Válido de lunes a miércoles.',
            discount: '50%'
        },
        {
            id: 2,
            title: 'Combo Familiar',
            description: '2 pizzas grandes + bebida de 2L + pan de ajo por solo Bs. 150',
            discount: 'Bs. 150'
        },
        {
            id: 3,
            title: 'Happy Hour',
            description: '30% de descuento en todas las pizzas de 5pm a 7pm',
            discount: '30%'
        },
        {
            id: 4,
            title: 'Estudiante Feliz',
            description: 'Muestra tu carnet universitario y obtén 20% de descuento',
            discount: '20%'
        }
    ]
};

const mockOrders = [
    {
        id: 'ORD-001',
        customerName: 'Juan Perez',
        address: 'Av. Arce, La Paz',
        status: 'pending',
        paymentType: 'efectivo',
        price: 85.50,
        coordinates: { lat: -16.505, lng: -68.130 }
    },
    {
        id: 'ORD-002',
        customerName: 'Maria Garcia',
        address: 'Calle 21 de Calacoto, La Paz',
        status: 'pending',
        paymentType: 'qr',
        price: 120.00,
        coordinates: { lat: -16.538, lng: -68.084 }
    },
    {
        id: 'ORD-003',
        customerName: 'Carlos Quispe',
        address: 'Plaza Murillo, La Paz',
        status: 'completed',
        paymentType: 'transferencia',
        price: 99.99,
        coordinates: { lat: -16.495, lng: -68.133 }
    },
    {
        id: 'ORD-004',
        customerName: 'Ana Choque',
        address: 'Cerca al Estadio Hernando Siles',
        status: 'pending',
        paymentType: 'efectivo',
        price: 65.00,
        coordinates: { lat: -16.500, lng: -68.120 }
    },
    {
        id: 'ORD-005',
        customerName: 'Pedro Infante',
        address: 'Zona de Obrajes',
        status: 'completed',
        paymentType: 'qr',
        price: 150.25,
        coordinates: { lat: -16.525, lng: -68.100 }
    }
];