import './DocumentationPage.css';

const DocumentationPage = () => {
    return (
        <div className="doc-container">
            <h1 className="doc-title">Proyecto Mutantes: entendiendo como funciona</h1>
            <p className="doc-text">Descripción General: El Proyecto Mutantes es una aplicación diseñada para detectar
                secuencias de ADN que pertenecen a individuos mutantes. Utiliza un patrón de búsqueda de
                trie para analizar las secuencias y determinar si un individuo presenta características genéticas
                inusuales (Secuencias de cuatro caracteres iguales en forma vertical, horizontal o diagonal).
            </p>
            <h2 className="doc-section-title">Funcionalidades Principales</h2>
            <ol className="doc-olist">
                <li>
                    Recepción de Secuencias de ADN:
                    <p className="doc-text">
                        Permite la entrada de secuencias de ADN en formato de matriz, donde cada fila representa una cadena de nucleótidos.
                    </p>
                </li>
                <li>
                    Validación de Datos:
                    <p className="doc-text">
                        Verifica que las secuencias de ADN sean válidas, asegurándose de que contengan únicamente los caracteres A, T, C y G.
                    </p>
                </li>
                <li>
                    Detección de Mutaciones:
                    <p className="doc-text">
                        Utiliza un algoritmo basado en un trie para buscar patrones específicos (secuencias de cuatro caracteres iguales) en las direcciones vertical, horizontal y diagonal.
                    </p>
                    <p className="doc-text">
                        Clasifica a los individuos como mutantes si se detectan las secuencias específicas.
                    </p>
                </li>
                <li>
                    Interfaz de Usuario:
                    <p className="doc-text">
                        Proporciona una API REST que permite a los usuarios enviar secuencias de ADN y recibir respuestas sobre la clasificación.
                    </p>
                </li>
                <li>
                    Almacenamiento de Resultados:
                    <p className="doc-text">
                        Los resultados de las verificaciones se pueden almacenar en una base de datos para análisis futuros.
                    </p>
                </li>
            </ol>
            <h2 className="doc-section-title">Descripción del problema:</h2>
            <p className="doc-text">En este proyecto se pidió realizar una API Rest que detectara mutantes en base a
                la composición de una tabla de tamaño 6x6 que únicamente puede contener las letras
                A,T,C,G.
            </p>
            <p className="doc-text">Sabremos si un humano es mutante, si encuentras más de una secuencia de cuatro letras
                iguales, de forma oblicua, horizontal o vertical.
            </p>
            <img className="doc-img" src="src/assets/mutant-table.png" alt="Imagen explicativa de las cadenas de adn para mutantes y no mutantes" />
            <p className="doc-text">
                Creí importante para el desarrollo de este proyecto no solo determinar qué arreglos
                ingresados nos da como resultado un mutante, sino también su persistencia en la base de
                datos, por lo cual hago uso de la entidad mutante, la cual tiene parámetros tales como un id,
                nombre de la persona, apellido y su cadena de ADN.

            </p>
            <p className="doc-text">
                Para la correcta implementación del proyecto se utilizó una arquitectura en tres capas
                (Controladores, servicios y repositorios) para las cuales usé como base mi clase más
                importante “Mutante”.
            </p>
            <p className="doc-text">
                Dentro de la carpeta main/java encontramos la carpeta contenedora principal
                com.example.mutantes que contiene todos los archivos usados para el proyecto:
            </p>
            <ul className="doc-ulist">
                <li>
                    Carpeta config:
                    <p className="doc-text">
                        esta carpeta contiene el archivo “CustomRevisionListener” que es una
                        implementación de un listener de revisiones en Hibernate Envers, que permite manejar
                        eventos relacionados con la creación de nuevas revisiones de auditoría.

                    </p>
                </li>
                <li>
                    Carpeta controllers:
                    <p className="doc-text">
                        aquí se guardan los controladores que manejarán las solicitudes
                        HTTP. En este caso solo tiene al archivo “MutanteController” que es un controlador
                        REST que maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y otras
                        funcionalidades relacionadas con la entidad Mutante. Utiliza el servicio
                        MutanteService para realizar la lógica de negocio y devuelve respuestas adecuadas a
                        las solicitudes HTTP. Las operaciones incluyen obtener todos los mutantes, obtener un
                        mutante por ID, actualizar un mutante, eliminar un mutante, analizar ADN para
                        determinar si una persona es un mutante y obtener estadísticas sobre los mutantes

                    </p>
                </li>
                <li>
                    Carpeta entities:
                    <p className="doc-text">
                        En esta carpeta se guardan las entidades relacionadas directamente
                        al funcionamiento del negocio(Mutante), y además incluye dos subcarpetas:
                    </p>
                    <ul className="doc-sublist">
                        <li>
                            audit:
                            <p className="doc-text">
                                Contiene la entidad revisión, la cual se encarga de almacenar
                                información sobre las revisiones realizadas en otras entidades de la aplicación.
                                Cuando se realizan cambios en las entidades que están siendo auditadas,
                                Hibernate Envers crea una nueva entrada en la tabla de revisiones, utilizando
                                esta entidad para registrar el número de revisión y la marca de tiempo
                                correspondiente.
                            </p>
                        </li>
                        <li>
                            dtos:
                            <p className="doc-text">
                                Contiene la entidad EstadisticasDTO. Esta entidad es parte de la lógica de
                                negocio, encargada de llevar la cuenta de la cantidad de mutantes, humanos y
                                su proporción.
                            </p>
                        </li>
                    </ul>
                </li>
                <li>
                    Carpeta repositories:
                    <p className="doc-text">
                        guarda a “MutanteRepository” que es un repositorio que
                        permite realizar operaciones de acceso a datos sobre la entidad Mutante. Proporciona
                        un método personalizado para contar el número de mutantes en función de su estado
                        (esMutante), además de heredar métodos estándar para operaciones CRUD gracias a
                        la extensión de JpaRepository. Esto facilita la interacción con la base de datos y mejora
                        la mantenibilidad del código.
                    </p>
                </li>
                <li>
                    Carpeta search:
                    <p className="doc-text">
                        aquí encontramos las entidades necesarias para la lógica de la
                        búsqueda de patrones con trie, en donde se encuentran las entidades Arbol y Nodo(se
                        explica la lógica más adelante.)
                    </p>
                </li>
                <li>
                    Carpeta services:
                    <p className="doc-text">
                        en esta carpeta están las entidades que contienen toda la lógica del
                        negocio. Más adelante está explicada su funcionalidad.
                    </p>
                </li>
            </ul>
            <h2 className='className="doc-section-title'>Búsqueda en trie:</h2>
            <p className="doc-text">
                El Trie es una estructura de datos especializada que se utiliza para almacenar cadenas de
                texto, donde cada nodo representa un carácter de la cadena. La operación de búsqueda en
                un Trie permite verificar de manera eficiente si una palabra existe en la estructura.
            </p>
            <ol className="doc-olist">
                <li>Estructura del trie Node
                    <p className='doc-text'>Cada nodo en el Trie contiene:</p>
                    <ul className="doc-ulist">
                        <li>Un arreglo (o mapa) de nodos hijos, donde cada índice corresponde a un carácter (por
                            ejemplo, para letras en inglés en minúscula, un arreglo de tamaño 26).
                        </li>
                        <li>Una bandera booleana que indica si una palabra termina en ese nodo.</li>
                    </ul>
                    <pre className="doc-code">
                        {`public class Nodo {
                        Nodo[] hijos;
                        boolean esFinDePalabra;
                        public Nodo() {
                            hijos = new Nodo[4]; // Para A, C, G, T
                            esFinDePalabra = false;
                        }
                    }`}
                    </pre>
                </li>
                <li>
                    Estructura del árbol:
                    <ul className="doc-ulist">
                        <li>Atributos
                            <ul className="doc-sublist">
                                <li>
                                    raiz: Es el nodo raíz del Trie. Se inicializa en el constructor de la clase
                                </li>
                                <li>
                                    adn: Un arreglo de cadenas que puede ser utilizado para almacenar secuencias
                                    de ADN.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Constructor
                            <p className="doc-text">
                                El constructor inicializa el nodo raíz del Trie. Se asume que la clase Nodo
                                es otra clase que representa un nodo en el Trie y que tiene un arreglo de nodos hijos.
                            </p>
                        </li>
                        <li>Método insertar:
                            <pre className="doc-code">
                                {`public void insertar(String palabra) {
                                    palabra = palabra.toUpperCase(); // Convertir a mayúsculas
                                    Nodo nodo = raiz;
                                    for (char c : palabra.toCharArray()) {
                                        int indice = charAIndice(c);
                                        if (nodo.hijos[indice] == null) {
                                            nodo.hijos[indice] = new Nodo()
                                        }
                                    nodo = nodo.hijos[indice];
                                    }
                                    nodo.esFinDePalabra = true;
                                }
                                 `}
                            </pre>

                            <ul className="doc-sublist">
                                <li>


                                </li>
                                <li>
                                    Convierte la palabra a mayúsculas para asegurar que la búsqueda sea
                                    insensible a mayúsculas y minúsculas
                                </li>
                                <li>
                                    Itera sobre cada carácter de la palabra:
                                </li>
                                <li>
                                    Convierte el carácter a un índice utilizando el método charAIndice.
                                </li>
                                <li>
                                    Si el nodo hijo correspondiente al índice es null, crea un nuevo nodo.

                                </li>
                                <li>
                                    Mueve el puntero al nodo hijo correspondiente.

                                </li>
                                <li>
                                    Al final, marca el nodo como el final de una palabra (esFinDePalabra = true).
                                </li>
                            </ul>
                        </li>
                        <li>
                            Método buscar:
                            <pre className="doc-code">
                                {`public boolean buscar(String palabra) {
                                        palabra = palabra.toUpperCase(); // Convertir a mayúsculas
                                        Nodo nodo = raiz;
                                        for (char c : palabra.toCharArray()) {
                                            int indice = charAIndice(c);
                                            if (nodo.hijos[indice] == null) {
                                                return false;
                                            }
                                            nodo = nodo.hijos[indice];
                                        }
                                            return nodo.esFinDePalabra;
                                    }`}
                            </pre>

                            <p className="doc-text">
                                Este método permite buscar una palabra en el Trie.
                            </p>
                            <p className="doc-text">
                                Convierte la palabra a mayúsculas para asegurar que la búsqueda sea
                                insensible a mayúsculas y minúsculas.
                            </p>
                            <p className="doc-text">
                                Itera sobre cada carácter de la palabra:
                            </p>
                            <ul className="doc-sublist">
                                <li>
                                    Convierte el carácter a un índice utilizando el método charAIndice.
                                </li>
                                <li>
                                    Si el nodo hijo correspondiente al índice es null, retorna false, indicando
                                    que la palabra no está en el Trie.
                                </li>
                                <li>
                                    Mueve el puntero al nodo hijo correspondiente.
                                </li>
                                <li>
                                    Al final, retorna true si el nodo actual marca el fin de una palabra
                                    (esFinDePalabra es true), indicando que la palabra fue encontrada en el Trie.
                                </li>
                            </ul>
                        </li>
                        <li>
                            Método charAIndice:
                            <p className="doc-text">
                                Este método convierte un carácter de ADN ('A', 'C', 'G', 'T') en un
                                índice correspondiente (0, 1, 2, 3). Si se pasa un carácter inválido, lanza una excepción.
                            </p>
                        </li>
                    </ul>
                </li>
                <li>
                    Lógica
                    <p className="doc-text">
                        Se encuentra implementada en mutanteService, donde se genera un árbol y la
                        longitud de la secuencia a buscar

                    </p>
                    <pre className="doc-code">
                        {`private Arbol arbol;
                            private static final int LONGITUD_SECUENCIA = 4;
                            public MutanteService() {
                            this.arbol = new Arbol();
                            inicializarArbol();
                        }
                        private void inicializarArbol() {
                            // Secuencias de ADN que se consideran mutantes
                            arbol.insertar("AAAA");
                            arbol.insertar("TTTT");
                            arbol.insertar("CCCC");
                            arbol.insertar("GGGG");
                        }`}
                    </pre>
                    <p className="doc-text">
                        Además se insertan las secuencias a buscar.
                    </p>
                    <p className="doc-text">
                        En siguiente encontramos el método analizarADN que se encarga de analizar la secuencia de
                        ADN de un objeto de tipo Mutante. Este método determina si la secuencia de ADN pertenece a
                        un "mutante" y realiza algunas acciones adicionales basadas en el resultado. A continuación, te
                        explico en detalle cómo funciona este método.
                    </p>
                    <pre className="doc-code">
                        {`public boolean analizarADN(Mutante persona) {
                            if (persona.getAdn() == null || persona.getAdn().length == 0) {
                                throw new IllegalArgumentException("Secuencia de ADN
                                inválida");
                            }
                            boolean resultado = isMutant(persona.getAdn());
                            persona.setEsMutante(resultado);
                            mutanteRepository.save(persona);
                            return resultado;
                        }`}
                    </pre>
                    <p className="doc-text">
                        Por ultimo tenemos:
                    </p>
                    <pre className="doc-code">
                        {`private boolean isMutant(String[] adn)`}
                    </pre>
                    <p className="doc-text">
                        Determina si una secuencia de ADN (representada como un arreglo de cadenas) pertenece a
                        un "mutante" según ciertas reglas. En este contexto, un "mutante" se define como una
                        secuencia que contiene al menos dos secuencias específicas de longitud
                        LONGITUD_SECUENCIA que se pueden encontrar en un Trie (almacenadas en la variable arbol).
                        Utiliza una matriz booleana para evitar volver a analizar posiciones ya revisadas. La
                        implementación es eficiente al evitar iteraciones innecesarias gracias al marcado de posiciones
                        visitadas.
                    </p>
                    <pre className="doc-code">
                        {`int n = adn.length;
                          int secuenciasEncontradas = 0;
                          // Matriz para rastrear posiciones visitadas
                          boolean[][] visitado = new boolean[n][n];
                          // Verificar horizontal y vertical en un solo bucle
                          for (int i = 0; i < n; i++) {
                            for (int j = 0; j < n; j++) {
                            // Si la posición ya ha sido visitada, continuar
                            if (visitado[i][j]) continue;`}
                    </pre>
                    <p className="doc-text">
                        Usamos dos bucles para recorrer el arreglo, y en caso de que ya se haya analizado el casllero
                        sigue con otro para evitar evaluaciones dobles
                        En consiguiente se verifican los caracteres de forma vertical, horizontal y diagonal (normal e
                        inversa)
                    </p>
                </li>
            </ol>
            <h2 className="doc-section-title">Obtener Estadísticas:</h2>
            <p className="doc-text">
                En este proceso intervienen dos entidades:
            </p>
            <ul>
                <li>
                    EstadisticasDTO: aquí se guarda la información relevante(cantHumanos,
                    cantMutantes, ratio)
                </li>
                <li>
                    MutanteService: contiene el método con la lógica para obtener las estadísticas
                </li>
            </ul>
            <pre className="doc-code">
                      {`public EstadisticasDTO obtenerEstadisticas () {
                            long totalMutantes = mutanteRepository.countByEsMutante(true);
                            long totalHumanos = mutanteRepository.countByEsMutante(false);
                            double ratio = totalHumanos > 0 ? (double) totalMutantes /
                            totalHumanos : 0.0;
                            return new EstadisticasDTO(totalMutantes, totalHumanos, ratio);
                        }`}
            </pre>
            <h2 className="doc-section-title">Diagrama de secuencia Estadísticas:</h2>
            <img className="doc-img" src="src/assets/diagram-stats.png" alt="Diagrama de secuencia de Estadísticas" />
            <h2 className="doc-section-title">Diagrama de secuencia AnalizarMutante:</h2>
            <img className="doc-img" src="src/assets/diagram-analyze.png" alt="Diagrama de secuencia de AnalizarMutante" />
        </div>

    );
}

export default DocumentationPage;