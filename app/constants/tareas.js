export const TAREAS = [
  {
    id: 1,
    titulo: 'Preparar Torta Rogel',
    descripcion: 'Elaboración de una clásica torta Rogel con dulce de leche y merengue',
    completada: false,
    subtareas: [
      {
        id: 101,
        titulo: 'Preparar masa base',
        descripcion: 'Mezclar 300g de harina, 150g de manteca, 100g de azúcar, 2 yemas y 1 huevo entero. Amasar hasta lograr una masa homogénea. Dividir en 10 discos finos y hornear a 180°C por 8-10 minutos.',
        estado: 'En progreso',
        fechaLimite: '2025-06-15',
        prioridad: 'Alta',
        responsable: 'Ana Gómez'
      },
      {
        id: 102,
        titulo: 'Preparar dulce de leche',
        descripcion: 'Calentar 2 litros de leche con 500g de azúcar y una cucharadita de bicarbonato de sodio. Cocinar a fuego lento revolviendo constantemente hasta obtener un dulce espeso y color caramelo.',
        estado: 'Pendiente',
        fechaLimite: '2025-06-20',
        prioridad: 'Media',
        responsable: 'Carlos Ruiz'
      },
      {
        id: 103,
        titulo: 'Armar y decorar torta',
        descripcion: 'Intercalar capas de masa horneada con generosas capas de dulce de leche. Para el merengue, batir 5 claras a punto nieve con 250g de azúcar. Cubrir toda la torta y dorar ligeramente con soplete o en horno.',
        estado: 'Pendiente',
        fechaLimite: '2025-06-25',
        prioridad: 'Alta',
        responsable: 'Laura Mendoza'
      }
    ]
  },
  {
    id: 2,
    titulo: 'Visitar tiendas de ropa',
    descripcion: 'Recorrido por centros comerciales para renovar el guardarropa',
    completada: false,
    subtareas: [
      {
        id: 201,
        titulo: 'Hacer lista de prendas necesarias',
        descripcion: 'Revisar el armario y anotar qué ropa hace falta: jeans, camisas, calzado, ropa interior, etc. Definir un presupuesto máximo para la compra.',
        estado: 'Completada',
        fechaLimite: '2025-06-10',
        prioridad: 'Alta',
        responsable: 'Miguel Sánchez'
      },
      {
        id: 202,
        titulo: 'Visitar centro comercial norte',
        descripcion: 'Recorrer las tiendas del centro comercial norte: Zara, H&M, Mango y tiendas locales. Comparar precios y opciones antes de comprar.',
        estado: 'En progreso',
        fechaLimite: '2025-06-18',
        prioridad: 'Alta',
        responsable: 'Paula Rodríguez'
      },
      {
        id: 203,
        titulo: 'Revisar ofertas online',
        descripcion: 'Buscar en sitios web de tiendas descuentos y promociones. Comparar con los precios vistos en tiendas físicas y decidir dónde comprar.',
        estado: 'Pendiente',
        fechaLimite: '2025-06-28',
        prioridad: 'Media',
        responsable: 'Roberto Luna'
      }
    ]
  },
  {
    id: 3,
    titulo: 'Limpiar la casa',
    descripcion: 'Limpieza general de todas las habitaciones y espacios',
    completada: false,
    subtareas: [
      {
        id: 301,
        titulo: 'Limpiar habitaciones',
        descripcion: 'Sacudir muebles, cambiar sábanas, barrer y trapear pisos, ordenar armarios y eliminar objetos innecesarios. Limpiar ventanas y espejos con producto específico.',
        estado: 'En progreso',
        fechaLimite: '2025-06-22',
        prioridad: 'Media',
        responsable: 'Diana Torres'
      },
      {
        id: 302,
        titulo: 'Limpiar cocina y baños',
        descripcion: 'Limpiar profundamente la cocina: electrodomésticos, alacenas, heladera, horno y mesadas. En baños: sanitarios, ducha, lavabos y azulejos con productos desinfectantes.',
        estado: 'Pendiente',
        fechaLimite: '2025-06-29',
        prioridad: 'Alta',
        responsable: 'Fernando Vargas'
      },
      {
        id: 303,
        titulo: 'Ordenar sala y espacios comunes',
        descripcion: 'Aspirar alfombras y sillones, sacudir y limpiar muebles, organizar libros y revistas. Limpiar lámparas y decoraciones. Revisar que todo esté en su lugar.',
        estado: 'Pendiente',
        fechaLimite: '2025-07-05',
        prioridad: 'Baja',
        responsable: 'Gabriela Morales'
      }
    ]
  },
  {
    id: 4,
    titulo: 'Compras en el supermercado',
    descripcion: 'Abastecimiento mensual de alimentos y productos de hogar',
    completada: false,
    subtareas: [
      {
        id: 401,
        titulo: 'Preparar lista de compras',
        descripcion: 'Revisar alacena, heladera y productos de limpieza para determinar qué hace falta. Organizar la lista por categorías: frutas/verduras, lácteos, carnes, limpieza, etc.',
        estado: 'Pendiente',
        fechaLimite: '2025-07-02',
        prioridad: 'Media',
        responsable: 'Héctor Ramírez'
      },
      {
        id: 402,
        titulo: 'Hacer compras',
        descripcion: 'Visitar el supermercado con la lista preparada. Comparar precios y aprovechar promociones. No olvidar llevar bolsas reutilizables y verificar fechas de vencimiento.',
        estado: 'Pendiente',
        fechaLimite: '2025-07-08',
        prioridad: 'Alta',
        responsable: 'Irene Gutiérrez'
      },
      {
        id: 403,
        titulo: 'Organizar las compras',
        descripcion: 'Al llegar a casa, guardar correctamente los alimentos: congelados, refrigerados y alacena. Ordenar productos de limpieza y aseo personal en sus lugares designados.',
        estado: 'Pendiente',
        fechaLimite: '2025-07-10',
        prioridad: 'Baja',
        responsable: 'Javier Medina'
      }
    ]
  }
];