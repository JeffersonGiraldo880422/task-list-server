¿Qué es mi producto y para qué sirve?
Mi producto es una REST API diseñada para gestionar listas de tareas. Esta API sigue los principios de la arquitectura REST (Transferencia de Estado Representacional) y proporciona endpoints para realizar operaciones básicas en las tareas. Los usuarios pueden utilizar esta API para crear nuevas tareas, actualizar información, eliminar tareas y obtener información detallada sobre las tareas existentes. Además, se incluye autenticación mediante tokens JWT para garantizar la seguridad y la autorización adecuada.

¿Cuáles son las funcionalidades más importantes y por qué los usuarios las usarían?
Crear una nueva tarea (POST /tasks): Permite a los usuarios agregar nuevas tareas a su lista mediante peticiones POST a la API. Esta funcionalidad es crucial para aquellos que desean gestionar y planificar sus actividades.

Actualizar una tarea (PUT /tasks/:id): Ofrece a los usuarios la capacidad de modificar la información de tareas existentes mediante peticiones PUT. Esto es esencial para reflejar cambios en los planes o ajustar detalles específicos.

Eliminar una tarea (DELETE /tasks/:id): Facilita a los usuarios la gestión de su lista al permitirles eliminar tareas que ya no son necesarias o que han sido completadas.

Listar todas las tareas (GET /tasks): Proporciona una visión general de todas las tareas almacenadas, permitiendo a los usuarios revisar su lista completa de tareas de manera eficiente.

Listar tareas completas e incompletas (GET /tasks/t/completed y GET /tasks/t/incomplete): Facilita a los usuarios la visualización selectiva de tareas según su estado, ya sea completadas o pendientes. Esto ayuda en la gestión y el seguimiento de los logros.

Estas funcionalidades son esenciales para una REST API de lista de tareas, ya que permiten a los usuarios integrar la gestión de tareas directamente en sus aplicaciones, herramientas o interfaces personalizadas. La autenticación añade una capa de seguridad y control de acceso para garantizar que solo usuarios autorizados interactúen con la API y accedan a sus propias tareas.
