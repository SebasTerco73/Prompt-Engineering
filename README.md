# Prompt Engineering en Agentes de IA
### Práctica Formativa Obligatoria 2 - Individual
​
## 🚀 Deploy

> **Enlace: https://prompt-engineering-ecru.vercel.app/**

---
## ✏️ Prompt

```
# Identidad

Debes actuar como si fueras un diseñador UX/UI y desarrollador Front-End experto en HTML5 , CSS3 y JavaScript. Toma las decisiones necesarias sin pedir datos adicionales. 

# Proyecto
Necesitas construir una landing page para un negocio especializado en ventas de comidas dulces y pastelería artesanal. Debe tener un estilo moderno, profesional y visualmente atractivo que incentive a la gente a hacer pedidos online y muestre los productos destacados.

# Contexto

<empresa>

Nombre: Caña Seca y Un Membrillo

Productos:
- Facturas
- Tortas
- Cookies
- Alfajores
- Budines
- Medialunas

Público objetivo:
Familias y jóvenes que buscan productos artesanales de calidad.

Paleta de colores:
    - Definir toda la paleta utilizando variables CSS dentro de :root.
Ejemplo:
:root{
    --color-bg: #000000;
    --color-primary: #000000;
    --color-secondary: #000000;
}
    - Está prohibido repetir códigos hexadecimales fuera de :root excepto para transparencias o gradientes.
    - Organizar las variables al inicio del archivo styles.css dentro de :root

    - Chocolate negro (#1B1410) — fondo principal, elegante y sofisticado
    - Café tostado (#2A1E18) — superficies, tarjetas y secciones secundarias
    - Caramelo premium (#C68A52) — botones, llamadas a la acción y elementos interactivos
    - Canela intensa (#8F5E3B) — bordes, detalles decorativos e íconos
    - Vainilla cremosa (#F5EFE8) — texto principal sobre fondos oscuros
    - Avellana suave (#C8B8AA) — texto secundario y descripciones
    - Miel dorada (#F0C987) — resaltados, badges y elementos destacados

Tipografías:
- Títulos y display: "Playfair Display" (Google Fonts)
- Cuerpo y UI: "Lato" (Google Fonts)

Imágenes:
- Utilizar imágenes de Unsplash con URLs válidas y accesibles.
- Todas las imágenes deben incluir:
  - alt descriptivo.
  - loading="lazy".
  - width y height.

- No inventar URLs de imágenes.
- Utilizar exclusivamente URLs completas y públicas de Unsplash Source con este formato:
https://images.unsplash.com/...
- Verificar que cada URL sea completa y apunte directamente a una imagen.
- Si no puede garantizar una URL funcional de Unsplash, utilizar imágenes de placeholder mediante:
https://picsum.photos/
- Está prohibido generar rutas inexistentes o URLs truncadas.
- Si existe cualquier duda sobre la disponibilidad de una imagen, utilizar picsum.photos en lugar de Unsplash.
- Las imágenes pueden repetirse entre productos si es necesario.
- La prioridad es que todas carguen correctamente.

</empresa>

# Requisitos

- Header fijo con menú de navegación:
    - Transicion al hacer scroll (>50px): agregar backdrop-filter: blur(10px), fondo semitransparente y sombra inferior sutil.
    - Desplazamientos suaves en las navegaciones
    - Menu hamburguesa para mobile, con panel lateral y overlay oscuro. Cierre al hacer click en overlay, en un link o con la tecla Escape
    - Logo (medialuna🥐)
    - Links: Nosotros · Productos · Testimonios · Contacto


- Hero Section
    - Título con el nombre de la empresa y animación de parpadeo sutil
    - Imagen destacada de fondo con overlay oscuro
    - Subtítulo impactante, divertido y en tono cercano
    - Botón CTA "Haga su pedido" que scrollea al formulario
    - Indicador de scroll animado

- Sección Sobre Nosotros.
    - Titulo: Sobre {nombre de la empresa}
    - 5 tarjetas con icono emoji + título + párrafo:
        - 🌱 Nuestros inicios
        - ✨ Hoy en día
        - 💛 Lo que queremos para vos  
        - 🤝 Comprometidos con la calidad
        - 🎉 Pedidos para eventos


- Sección de Productos Destacados.
    - Título: "Nuestros productos"
    - CSS Grid con tarjetas para cada producto
    - Mínimo 9 productos con imagen, categoría, nombre y descripción
    - Hover: agrandar la tarjeta con scale(), agregar sombra y animación de reflejo (shine)
    - Imagen con zoom suave al hacer hover

- Sección de Testimonios.
    - Título: "Opiniones de nuestros clientes"
    - Mínimo 6 tarjetas con: estrellas, nombre del cliente, rol/contexto y testimonio
    - Los testimonios deben cubrir: un producto específico, el ambiente del local y la buena atención

- Formulario de Contacto.
    - Titulo: Hacenos tu pedido
    - Subtitulo: "Te hacemos un presupuesto especial para fiestas 🎉"
    - Campos obligatorios: nombre, telefono, correo, mensaje
    - Validación en tiempo real con mensajes de error individuales por campo en español
    - Botón "Enviar consulta":
        - Mostrar estado "Enviando..." durante la simulación de envío.
        - Luego mostrar un modal centrado en pantalla (no un mensaje inline).
        - El modal debe contener:
            - Título: "Consulta enviada"
            - Mensaje: "Mensaje recibido, lo contactaremos a la brevedad."
            - Botón: "Aceptar"
        - El usuario debe presionar "Aceptar" para cerrar el modal.
        - Al cerrar el modal:
            - Limpiar todos los campos del formulario.
            - Realizar scroll suave al inicio de la página.
        - No recargar la página.
        - El modal debe incluir overlay oscuro de fondo.
        - Debe poder cerrarse con la tecla Escape.
        - Debe respetar accesibilidad (aria-modal, role="dialog", focus trap básico).

- Footer con redes sociales
    - Logo + nombre de la empresa
    - Links a Instagram (https://www.instagram.com/) y Facebook (https://www.facebook.com/) con íconos SVG inline
    - Copyright 2026

- Extras
    - Botón flotante de WhatsApp con ícono SVG
    - Animaciones de entrada con Intersection Observer (fade-in + slide-up con stagger entre elementos)
    - Meta tags SEO básicos (description, og:title, og:description, og:type, viewport)
    - Respetar contraste WCAG AA y usar atributos aria-label, roles semánticos y aria-live donde corresponda
    - Respetar prefers-reduced-motion

# Diseño
- Responsive (desktop / tablet / mobile con 3 breakpoints)
- Usar Flexbox y Grid
- Efectos hover en botones y enlaces.
- Sin librerías ni frameworks externos (vanilla HTML, CSS y JS)
- IIFE en JavaScript para no contaminar el scope global

# Calidad visual
La prioridad principal es generar una landing page visualmente atractiva y profesional.
No generar una apariencia genérica o académica.
Utilizar:
- Espaciado consistente.
- Jerarquía visual clara.
- Sombras suaves.
- Bordes redondeados modernos.
- Efectos hover elegantes.
- Secciones bien diferenciadas.
- Excelente experiencia de usuario en desktop y mobile.
El resultado debe parecer un sitio real listo para producción.

# Calidad de código
- HTML semántico.
- CSS organizado por secciones.
- JavaScript comentado.
- Evitar código duplicado.
- Nombres de clases descriptivos.

# Formato de salida
Generar tres archivos:
1. index.html
2. styles.css
3. script.js

Mostrar cada archivo en un bloque de código independiente.

# Importante
- No eliminar ni simplificar requisitos.
- Todos los requisitos son obligatorios.
- Si existe conflicto entre simplicidad y cumplimiento, priorizar cumplimiento.
- Todo debe estar en español
- Agregar comentarios separando cada seccion
```

## 📸 Imagenes

| Sección | Imagen |
|---------|--------|
|index|<img width="995" height="624" alt="image" src="https://github.com/user-attachments/assets/00f5b38b-8f53-483e-8ca2-25ca25c5965e" />|


## 👋​ Autor

| [<img src="https://avatars.githubusercontent.com/u/138830413?v=4" width="115"><br><sub>Sebastián Matías Puche</sub><br><sub>sebasterco10@gmail.com</sub>](https://github.com/SebasTerco73) |
| :---: |
