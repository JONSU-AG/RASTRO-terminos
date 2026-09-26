/**
 * Catálogo Base de Obras Literarias Universales y Peruanas
 * Formato híbrido de alta fidelidad:
 * - Resumen Detallado: Sinopsis, contexto de época, estructura por actos/capítulos y personajes.
 * - Desglose de Trama (Profundidad narrativa 5 páginas): Evolución cronológica exhaustiva escena por escena.
 * - Apunte de Repaso: Síntesis directa, datos fundamentales, símbolos y claves analíticas preuniversitarias.
 * Estricto: Cero emojis directos en texto, sin marcas registradas ni jerga forzada de examen.
 */

export const LITERATURA_OBRAS = [
  {
    id: 'los-rios-profundos',
    titulo: 'Los ríos profundos',
    autor: 'José María Arguedas',
    año: '1958',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Novela',
    corriente: 'Neoindigenismo',
    temaPrincipal: 'El desarraigo cultural, el conflicto de identidad y la conexión mística del mundo andino frente a la violencia social.',
    portadaGradiente: 'linear-gradient(145deg, #064e3b 0%, #047857 50%, #065f46 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'Ernesto, un adolescente educado íntimamente en comunidades quechuas, viaja con su padre Gabriel, un abogado itinerante, por diversos valles del sur peruano hasta llegar a Abancay, donde es internado en un severo colegio religioso. En este espacio experimenta la marginación, los conflictos entre estudiantes de procedencias opuestas y la rebelión popular de las chicheras lideradas por doña Felipa, mientras encuentra en la naturaleza viva y en el zumbayllu una vía de reconciliación y resistencia espiritual.',
      contextoHistorico: 'Publicada a mediados del siglo XX, la obra supera la perspectiva folclórica o exterior del indigenismo clásico para adentrarse en la intimidad psicológica y cósmica del hombre andino frente a la modernización excluyente.',
      analisisTrama: [
        {
          titulo: 'El viaje iniciático y la revelación de los muros del Cusco (Capítulos I - III)',
          detalle: 'Gabriel y su hijo Ernesto llegan al Cusco en busca de un pariente terrateniente conocido como El Viejo. Ernesto queda sobrecogido ante la arquitectura sagrada de los muros incaicos (el palacio de Inca Roca y la piedra de doce ángulos), a los que percibe como seres vivos dotados de un pulso que dialoga con los ríos andinos. En contraposición radical, la casa de El Viejo emana mezquindad, sevicia y desprecio hacia los indígenas sirvientes (pongos), provocando en el muchacho una sensación de repulsión hacia la aristocracia hacendaria.'
        },
        {
          titulo: 'El internamiento en Abancay y el microcosmos escolar (Capítulos IV - V)',
          detalle: 'Padre e hijo prosiguen viaje por valles cálidos hasta asentarse en Abancay. Ante la necesidad de litigar en otras provincias, Gabriel matricula a Ernesto como interno en el colegio religioso regentado por el Padre Linares. El internado se manifiesta como una réplica claustrofóbica y violenta de la sociedad nacional: conviven cadetes y muchachos de la costa, la sierra alta, la selva y las haciendas. La ley del más fuerte impera bajo el acoso constante de figuras como el bruto Añuco y Lleras, obligando a Ernesto a refugiarse en la contemplación solitaria de los árboles y la ribera.'
        },
        {
          titulo: 'El zumbayllu y la restauración de la armonía comunitaria (Capítulo VI)',
          detalle: 'La hostilidad del patio escolar se transforma milagrosamente con la llegada del trompo mágico (zumbayllu), introducido por el entusiasta Ántero (el Markaska). El zumbayllu no es un juguete común; emite un canto cristalino que evoca insectos sagrados y corrientes de agua viva. Ernesto descubre en el sonido del trompo un vehículo místico capaz de transportar mensajes y plegarias a través del espacio y las montañas, disolviendo temporalmente los odios entre los compañeros y reconciliando su espíritu con el alma quechua.'
        },
        {
          titulo: 'La presencia de la opa Marcelina y la degradación moral (Capítulo VII)',
          detalle: 'En los patios traseros del colegio deambula la opa Marcelina, una mujer con discapacidad intelectual acogida por los cocineros. Los internos mayores abusan de ella arrastrados por impulsos oscuros y violentos, generando un ambiente de culpa reprimida y degradación que el Padre Linares intenta exorcizar mediante sermones apocalípticos. Ernesto experimenta un desgarrador conflicto interior entre el asco por la bajeza humana de sus pares y la profunda compasión cristiana y andina hacia la víctima indefensa.'
        },
        {
          titulo: 'El motín popular de las chicheras y la represión militar (Capítulos VIII - IX)',
          detalle: 'En Abancay estalla una severa escasez de sal, acaparada deliberadamente por los terratenientes para suministrarla al ganado de las haciendas mientras la población empobrecida sufre necesidad. Las chicheras de la ciudad, encabezadas por la valerosa doña Felipa, asaltan los depósitos y reparten el producto equitativamente entre los colonos de Patibamba. Ernesto presencia con deslumbramiento la marcha rebelde y acompaña a las mujeres cantando huaynos de combate. La respuesta del Estado es implacable: el ejército ingresa a sangre y fuego a la ciudad, persigue a las cabecillas e instaura el toque de queda.'
        },
        {
          titulo: 'La peste del tifus y el éxodo purificador por el río Pachachaca (Capítulos X - XI)',
          detalle: 'Una mortal epidemia de tifus negro brota en las haciendas periféricas y se expande incontenible por Abancay. Los hacendados huyen, el colegio es clausurado y los indios colonos invaden la ciudad exigiendo misas para aplacar la ira divina. Ernesto decide marcharse hacia la estancia de su tío en las alturas para salvar su vida. Al atravesar el gran puente sobre el río Pachachaca, contempla los torrentes impetuosos y comprende que la fuerza sagrada de los ríos profundos limpiará la peste, la injusticia y la inmundicia colonial, preservando intacta la memoria y el porvenir del pueblo quechua.'
        }
      ],
      personajes: [
        { nombre: 'Ernesto', rol: 'Protagonista y narrador', descripcion: 'Adolescente mestizo educado en ayllus indígenas, hipersensible a la naturaleza y al canto quechua, puente moral entre dos mundos.' },
        { nombre: 'Gabriel', rol: 'Padre de Ernesto', descripcion: 'Abogado trashumante, bohemio y noble, incapaz de asentarse de forma definitiva por su temperamento errante.' },
        { nombre: 'El Viejo', rol: 'Tío de Ernesto', descripcion: 'Terrateniente cusqueño avaro, déspota y fanático religioso, encarnación del feudalismo hacendario más despiadado.' },
        { nombre: 'Doña Felipa', rol: 'Líder popular', descripcion: 'Chichera mestiza de temple indómito que encabeza el levantamiento social de las mujeres por la redistribución de la sal.' },
        { nombre: 'Padre Linares', rol: 'Director del internado', descripcion: 'Sacerdote carismático y severo, cuya oratoria hipnótica legitima el statu quo y el dominio de los patrones sobre los siervos.' },
        { nombre: 'Ántero ("El Markaska")', rol: 'Compañero escolar', descripcion: 'Muchacho de lunar marcado que fabrica e introduce el zumbayllu, compañero entrañable de Ernesto hasta que su extracción social lo distancia.' }
      ],
      temasClave: [
        { titulo: 'El zumbayllu como mediador cósmico', explicacion: 'El trompo mágico opera como una síntesis de arte, juego y religión, capaz de vehicular plegarias y suspender la hostilidad terrenal.' },
        { titulo: 'El río y la purificación cósmica', explicacion: 'El Pachachaca no es un mero accidente geográfico; es una deidad fluvial (Apu/Mayu) que limpia la peste biológica y la corrupción social.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la novela neoindigenista. Narra la maduración moral de Ernesto en el internado de Abancay, entre la violencia machista escolar, la rebelión de las chicheras por la sal y el azote del tifus, alcanzando la salvación mediante su fe en la energía purificadora de los ríos andinos.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela neoindigenista' },
        { clave: 'Autor', valor: 'José María Arguedas Altamirano (Andahuaylas)' },
        { clave: 'Estructura', valor: '11 capítulos secuenciales continuos' },
        { clave: 'Tipo de narrador', valor: 'Primera persona autobiográfica / perspectivismo lírico' },
        { clave: 'Espacios nucleares', valor: 'Cusco (muros incas), Abancay (colegio religioso), río Pachachaca' },
        { clave: 'Símbolo rector', valor: 'El zumbayllu (canto, música y memoria colectiva)' }
      ],
      elementosClave: [
        { titulo: 'Neoindigenismo frente al indigenismo tradicional', contenido: 'Introduce la perspectiva interior del indígena desde su lengua, espiritualidad y afectos, sin recurrir a la caricatura paternalista o pintoresca.' },
        { titulo: 'Tensión lingüística', contenido: 'Castellano andinizado: estructura oracional, giros sintácticos y metáforas moldeadas directamente sobre el pensamiento quechua.' },
        { titulo: 'Desenlace filosófico', contenido: 'Fuga solitaria de Ernesto cruzando el río, confiado en que el agua arrastrará la muerte y regenerará el equilibrio del mundo.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué se rebelan las chicheras en Abancay?',
          respuesta: 'Porque las haciendas acapararon toda la sal disponible para dársela al ganado, dejando desabastecida a la población pobre y a los colonos indígenas.'
        },
        {
          pregunta: '¿Qué representa el zumbayllu en la obra?',
          respuesta: 'Es un objeto mágico-musical que conecta al ser humano con las fuerzas vivas de la naturaleza y apacigua la agresividad de los alumnos en el internado.'
        }
      ]
    }
  },
  {
    id: 'la-ciudad-y-los-perros',
    titulo: 'La ciudad y los perros',
    autor: 'Mario Vargas Llosa',
    año: '1963',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Novela',
    corriente: 'Boom Latinoamericano (Realismo urbano)',
    temaPrincipal: 'La violencia institucionalizada, el autoritarismo militar y la hipocresía social reflejada en la vida escolar.',
    portadaGradiente: 'linear-gradient(145deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'En el Colegio Militar Leoncio Prado de Lima, adolescentes de diversas clases sociales y geografías del Perú conviven bajo un régimen disciplinario castrense. Para subsistir frente al hostigamiento, un grupo crea la sociedad secreta "El Círculo". El robo de un examen oficial desencadena una espiral de delaciones, el confinamiento general de la sección y el misterioso asesinato del cadete Ricardo Arana ("El Esclavo"). El intento de Alberto Fernández ("El Poeta") por hacer justicia choca contra el pacto de silencio y la corrupción del alto mando militar.',
      contextoHistorico: 'Obra fundacional del Boom Hispanoamericano galardonada con el Premio Biblioteca Breve (1962). Rompió esquemas narrativos mediante el uso magistral del monólogo interior, saltos temporales y la técnica de los vasos comunicantes.',
      analisisTrama: [
        {
          titulo: 'El rito de iniciación, la ley de la selva y El Círculo (Sección Inicial)',
          detalle: 'Los nuevos cadetes que ingresan al tercer año sufren el cruel "bautizo" a manos de los alumnos de cuarto año, siendo sometidos a humillaciones físicas, ladridos como perros y agresiones para anular su individualidad. Como respuesta de supervivencia, el cadete apodado El Jaguar organiza "El Círculo", una sociedad clandestina que impone su propia justicia, trafica cigarrillos y licor, y cobra venganza de cualquier ofensa externa.'
        },
        {
          titulo: 'El robo del examen de química y el encierro disciplinario (Desarrollo)',
          detalle: 'Por sorteo interno de El Círculo, le corresponde al cadete Porfirio Cava ("El Serrano") sustraer las respuestas del examen de química del despacho de los profesores. Cava rompe un cristal de la ventana durante la noche y comete el robo. Al día siguiente, los oficiales descubren la infracción y castigan a toda la sección cancelando las salidas de fin de semana por tiempo indefinido hasta que aparezca el responsable.'
        },
        {
          titulo: 'La delación del Esclavo y la expulsión pública de Cava (Punto de quiebre)',
          detalle: 'Ricardo Arana ("El Esclavo"), un joven de carácter pasivo y sensible acosado sistemáticamente por sus compañeros, no soporta el encierro porque anhela desesperadamente salir a ver a Teresa, una humilde vecina de quien está enamorado. Agotado por el maltrato, acude en secreto ante el teniente Gamboa y confiesa que vio a Cava cometer el robo. Cava es degradado públicamente, despojado de sus insignias en el patio central y expulsado del colegio con deshonra militar. El Jaguar promete una venganza implacable contra el soplón.'
        },
        {
          titulo: 'Las maniobras de campaña en El Carquín y el disparo mortal (Clímax trágico)',
          detalle: 'Durante unas prácticas tácticas con fuego real en el campo de tiro de El Carquín, los cadetes avanzan entre trincheras y humo. En medio del desorden de las ráfagas, Ricardo Arana recibe un impacto de bala por la espalda en la cabeza. Los mandos militares ocultan el incidente calificándolo de inmediato como "disparo accidental por negligencia del propio cadete", sepultando el cadáver con rapidez para no perjudicar la imagen pública de las Fuerzas Armadas.'
        },
        {
          titulo: 'La acusación de Alberto Fernández y el cerco contra Gamboa (Conflicto moral)',
          detalle: 'Alberto ("El Poeta"), carcomido por el remordimiento y el cariño hacia su difunto amigo Arana, rompe el código del silencio y acusa formalmente al Jaguar del asesinato ante el incorruptible teniente Gamboa. Gamboa asume la denuncia y presiona al coronel para realizar peritajes balísticos. Sin embargo, los superiores chantajean a Alberto descubriendo en su taquilla novelitas pornográficas manuscritas que vendía a los cadetes, amenazándolo con arruinar su reputación familiar. Para extinguir el escándalo, el colegio traslada a Gamboa a una guarnición remota en Juliaca.'
        },
        {
          titulo: 'El motín en la cuadra, la redención del Jaguar y la reintegración burguesa (Epílogo)',
          detalle: 'En el dormitorio, los cadetes asumen falsamente que el Jaguar delató a todos por el tráfico de alcohol y lo muelen a golpes entre toda la sección; el Jaguar no pronuncia palabra y acepta el castigo en silencio. Tras graduarse, los caminos se separan: Alberto olvida sus dilemas éticos y viaja a Estados Unidos para complacer a su padre burgués; el Jaguar, reivindicado en su dignidad, confiesa privadamente a Gamboa que él mató al Esclavo, busca un trabajo honrado como empleado de banco y contrae matrimonio con Teresa.'
        }
      ],
      personajes: [
        { nombre: 'Alberto Fernández ("El Poeta")', rol: 'Cadete burgués de Miraflores', descripcion: 'Muchacho reflexivo que escribe cartas de amor y cuentos eróticos para sobrevivir; oscila entre la cobardía moral y la lealtad.' },
        { nombre: 'El Jaguar', rol: 'Líder temido de El Círculo', descripcion: 'Cadete de extracción humilde que se forjó en el combate callejero; desprecia a los débiles pero posee un riguroso código de lealtad.' },
        { nombre: 'Ricardo Arana ("El Esclavo")', rol: 'Víctima del sistema', descripcion: 'Joven introvertido sometido a abusos por su padre y por sus compañeros de colegio; incapaz de adaptarse a la agresividad militar.' },
        { nombre: 'Teniente Gamboa', rol: 'Oficial de carrera recto', descripcion: 'Militar estricto y honorable que cree ciegamente en la disciplina reglamentaria, castigado por no tolerar el encubrimiento.' },
        { nombre: 'Teresa', rol: 'Nexo sentimental pasivo', descripcion: 'Joven honesta y modesta de Lince cortejada sucesivamente por el Esclavo, Alberto y el Jaguar, con quien finalmente se casa.' },
        { nombre: 'El Serrano Cava', rol: 'Cadete provincial', descripcion: 'Compañero sumiso de El Círculo que ejecuta el robo del examen y sufre la humillación de la expulsión militar.' }
      ],
      temasClave: [
        { titulo: 'El machismo como deformación pedagógica', explicacion: 'La masculinidad entendida como agresión física, dominio sobre el indefenso y desprecio de toda muestra de ternura o intelectualidad.' },
        { titulo: 'La corrupción y el encubrimiento corporativo', explicacion: 'La institución militar prefiere encubrir un asesinato antes que aceptar una mancha en su honor y prestigio público.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Hito fundacional del Boom Hispanoamericano. Ambientada en el Colegio Militar Leoncio Prado, expone el autoritarismo, el machismo salvaje y el pacto de silencio institucional tras el asesinato de Ricardo Arana, que enfrenta la conciencia de Alberto con la fuerza indomable del Jaguar.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela urbana contemporánea' },
        { clave: 'Autor', valor: 'Mario Vargas Llosa (Arequipa)' },
        { clave: 'Premio consagratorio', valor: 'Premio Biblioteca Breve (Seix Barral, 1962)' },
        { clave: 'Técnicas modernas', valor: 'Monólogo interior, vasos comunicantes, perspectivismo múltiple' },
        { clave: 'Espacios rectores', valor: 'Colegio Militar Leoncio Prado (La Perla, Callao) y distritos limeños' },
        { clave: 'Detonante narrativo', valor: 'El robo del examen de química' }
      ],
      elementosClave: [
        { titulo: 'El bautizo de los perros', contenido: 'Ritual violento de iniciación donde los veteranos obligan a los ingresantes a pelear y humillarse, justificando el ciclo perpetuo de la brutalidad.' },
        { titulo: 'El destino de Gamboa', contenido: 'Paradigma del militar ejemplar sancionado por el sistema con el destierro burocrático a Juliaca por negarse a ser cómplice de la mentira.' },
        { titulo: 'Evolución del Jaguar', contenido: 'Pasa de ser el verdugo implacable a demostrar una madurez ética superior a la de la hipócrita burguesía limeña.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Quién asesinó al cadete Ricardo Arana ("El Esclavo")?',
          respuesta: 'El Jaguar le disparó por la espalda durante las maniobras de tiro para vengar la delación que provocó la expulsión de Cava.'
        },
        {
          pregunta: '¿Por qué Alberto retira la denuncia contra el Jaguar?',
          respuesta: 'Porque los coroneles hallaron sus novelas eróticas clandestinas y lo chantajearon con entregarlas a sus padres y manchar su nombre social.'
        }
      ]
    }
  },
  {
    id: 'el-mundo-es-ancho-y-ajeno',
    titulo: 'El mundo es ancho y ajeno',
    autor: 'Ciro Alegría',
    año: '1941',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Novela',
    corriente: 'Indigenismo clásico',
    temaPrincipal: 'La lucha comunitaria por la posesión de la tierra frente al despojo de los terratenientes y la ley parcializada.',
    portadaGradiente: 'linear-gradient(145deg, #78350f 0%, #92400e 50%, #451a03 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'La comunidad andina de Rumi, guiada por la sabiduría del anciano alcalde Rosendo Maqui, vive en armonía solidaria cultivando sus tierras fértiles. El ambicioso hacendado Álvaro Amenábar de Umay entabla un juicio de linderos fraudulento para apropiarse del valle y obligar a los comuneros a trabajar como mano de obra semiesclava en sus minas. Tras ser expulsados a las inhóspitas alturas de Yanañahui y sufrir la muerte de Maqui en prisión, los campesinos se reorganizan con el liderazgo de Benito Castro, resistiendo hasta el martirio final ante el ejército.',
      contextoHistorico: 'Ganadora del Gran Premio Latinoamericano de Novela Farrar & Rinehart en 1941. Constituye el monumento más representativo de la literatura indigenista de denuncia social frente al gamonalismo feudal del norte andino peruano.',
      analisisTrama: [
        {
          titulo: 'La plenitud comunal y la cosmovisión de Rosendo Maqui (Capítulos I - V)',
          detalle: 'Se describe la vida apacible, fraterna y productiva en la comunidad de Rumi. Rosendo Maqui, alcalde sabio y depositario de la tradición oral, administra la justicia con serenidad y orienta las faenas comunales. La tierra no se percibe como una mercancía transable, sino como una madre sagrada (Pachamama) que pertenece a todos los que la riegan con su sudor. Sin embargo, malos presagios enturbian la paz: el paso de una culebra en el camino y los rumores sobre las codicias del hacendado vecino.'
        },
        {
          titulo: 'La conspiración gamonal y la farsa del juicio de linderos (Capítulos VI - IX)',
          detalle: 'Don Álvaro Amenábar, propietario de la hacienda Umay, decide expandir sus dominios arrebatando los valles de Rumi. Su fin primordial no es solo agrícola, sino reducir a los indios al desamparo para forzarlos a trabajar en su mina de plata ("Cóndor de Plata"). Mediante sobornos masivos, compra los servicios del tinterillo Bismarck Ruiz, falsifica títulos coloniales de propiedad e intimida a testigos campesinos para inventar un reclamo territorial en los tribunales provinciales.'
        },
        {
          titulo: 'El fallo corrupto y el éxodo pacífico a Yanañahui (Capítulos X - XIV)',
          detalle: 'Pese a la defensa honesta emprendida por el abogado Arturo Correa Zavala, el sistema judicial corrupto falla a favor del hacendado. Rosendo Maqui, convencido de que la violencia directa provocaría una masacre innecesaria de su gente indefensa, convence a la asamblea de acatar la orden de desalojo y emigrar en masa hacia Yanañahui, una meseta alta, fría y pedregosa. La despedida de Rumi es desgarradora: los comuneros recogen sus semillas y contemplan cómo las llamas y el ganado de Amenábar invaden sus hogares ancestrales.'
        },
        {
          titulo: 'La dispersión de los comuneros y la muerte de Rosendo Maqui (Capítulos XV - XVIII)',
          detalle: 'La dureza de Yanañahui dispersa a muchos miembros: unos van a la selva en busca de caucho donde perecen de fiebres, otros son atrapados en las haciendas cocaleras y otros se convierten en bandoleros. El Fiero Vásquez, bandolero justiciero, intenta apoyar a la comunidad pero atrae la persecución policial. Rosendo Maqui es inculpado injustamente de incitar al bandidaje y ocultar armas; encarcelado en una celda oscura y pestilente, es golpeado salvajemente por los gendarmes hasta morir en soledad.'
        },
        {
          titulo: 'El retorno de Benito Castro y la modernización de la comunidad (Capítulos XIX - XXII)',
          detalle: 'Años después, regresa a Yanañahui Benito Castro, hijo adoptivo de Rosendo Maqui. Benito había marchado al mundo exterior: aprendió a leer y escribir, sirvió en el ejército, conoció los sindicatos obreros en las ciudades costeras y comprendió los mecanismos del poder letrado. Elegido nuevo alcalde comunal, Benito unifica a los campesinos, deseca la laguna pantanosa para ganar pastizales fértiles, construye una escuela comunitaria e infunde una nueva conciencia de dignidad y defensa armada.'
        },
        {
          titulo: 'La segunda ofensiva de Amenábar y el sacrificio heroico (Capítulos XXIII - XXIV)',
          detalle: 'Amenábar, incapaz de tolerar que los comuneros sigan libres y productivos, trama un nuevo desalojo para apoderarse también de las tierras de Yanañahui. Advertidos del engaño judicial, la comunidad proclama: "¡De aquí no nos moverán!". Cuando el ejército y los matones del patrón atacan con fusiles Mauser de largo alcance, los comuneros resisten heroicamente con escopetas antiguas, piedras y hondas. Tras horas de desigual combate, Benito Castro es alcanzado por las balas militares. La comunidad es aniquilada entre el humo y el clamor desgarrador de las viudas que se preguntan: "¿Adónde iremos? ¡El mundo es ancho pero ajeno!".'
        }
      ],
      personajes: [
        { nombre: 'Rosendo Maqui', rol: 'Alcalde ancestral', descripcion: 'Patriarca de Rumi que personifica la prudencia, el respeto a la madre tierra y la fe inquebrantable en la justicia humana.' },
        { nombre: 'Benito Castro', rol: 'Alcalde renovador', descripcion: 'Líder joven que asimila el saber del mundo moderno y comanda la resistencia armada para defender el suelo comunal.' },
        { nombre: 'Don Álvaro Amenábar', rol: 'Hacendado gamonal de Umay', descripcion: 'Oligarca inescrupuloso y déspota que instrumentaliza leyes, jueces y soldados para expandir su latifundio y su mina.' },
        { nombre: 'El Fiero Vásquez', rol: 'Bandolero justiciero', descripcion: 'Guerrillero marginado por la ley que simpatiza con los comuneros y combate a los capataces de las haciendas.' },
        { nombre: 'Bismarck Ruiz', rol: 'Abogado tinterillo', descripcion: 'Defensor inicial de la comunidad que traiciona a los campesinos vendido por el dinero y las dádivas del gamonal.' }
      ],
      temasClave: [
        { titulo: 'La comunidad andina como modelo civilizatorio', explicacion: 'La propiedad comunal no es una rémora primitiva sino un sistema solidario, ecológicamente sostenible y democrático.' },
        { titulo: 'La tragedia del despojo', explicacion: 'El indígena privado de su tierra pierde sus raíces vitales y queda condenado a la explotación y la indigencia en un mundo hostil.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide del indigenismo peruano. Epopeya trágica de la comunidad de Rumi, destruida por la codicia del hacendado Álvaro Amenábar, que transita desde la resistencia pacífica y resignada de Rosendo Maqui hasta la insurrección armada y heroica de Benito Castro.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela indigenista' },
        { clave: 'Autor', valor: 'Ciro Alegría Bazán (Sartimbamba, La Libertad)' },
        { clave: 'Premio obtenido', valor: 'Concurso Continental de Novela Farrar & Rinehart (1941)' },
        { clave: 'Escenarios geográficos', valor: 'Comunidad de Rumi, meseta de Yanañahui y hacienda Umay' },
        { clave: 'Liderazgos históricos', valor: 'Rosendo Maqui (anciano tradicional) vs. Benito Castro (joven letrado)' }
      ],
      elementosClave: [
        { titulo: 'El valor de la tierra comunal', contenido: 'La tierra no es una posesión comercial; es el centro místico y moral donde reposan los ancestros y se forja la identidad colectiva.' },
        { titulo: 'La frase final emblemática', contenido: '"¿Adónde iremos? ¿Adónde?", lamento de las viudas que condensa la desolación de los despojados en su propia patria.' },
        { titulo: 'Crítica al sistema judicial', contenido: 'La novela demuestra que los tribunales y códigos de la República sirvieron como herramientas de expoliación a favor del gamonalismo.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Cuál era el objetivo oculto de Álvaro Amenábar al despojar a Rumi?',
          respuesta: 'Privar a los indígenas de sus medios de sustento para obligarlos a contratarse como mano de obra semiesclava en su mina de plata Cóndor de Plata.'
        },
        {
          pregunta: '¿Cómo muere el alcalde Rosendo Maqui?',
          respuesta: 'Es encarcelado falsamente bajo la acusación de encubrir al bandolero Fiero Vásquez y muere en su celda producto de las golpizas propinadas por los guardias.'
        }
      ]
    }
  },
  {
    id: 'crimen-y-castigo',
    titulo: 'Crimen y castigo',
    autor: 'Fiódor Dostoyevski',
    año: '1866',
    pais: 'Rusia',
    genero: 'Narrativo',
    especie: 'Novela',
    corriente: 'Realismo Psicológico',
    temaPrincipal: 'La transgresión moral, la justificación intelectual del homicidio y la redención espiritual a través de la culpa y el sufrimiento.',
    portadaGradiente: 'linear-gradient(145deg, #450a0a 0%, #7f1d1d 50%, #1c1917 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Rodión Románovich Raskólnikov, un brillante exestudiante de derecho sumido en la indigencia en los barrios marginales de San Petersburgo, formula una teoría filosófica según la cual la humanidad se divide entre hombres ordinarios y seres extraordinarios (napoleónicos), con derecho moral a cometer crímenes en bien del progreso. Para poner a prueba su superioridad, asesina a una anciana usurera y a su inocente hermana. Tras el homicidio, se hunde en una devastadora agonía psíquica, acorralado por el astuto juez Porfiri Petrovich y rescatado de la locura por el amor compasivo de Sonia Marmeládova.',
      contextoHistorico: 'Publicada en entregas en la revista El Mensajero Ruso en 1866. Combate el utilitarismo, el nihilismo ateo y el racionalismo radical europeo que deshumanizaban la conciencia moral en la Rusia del siglo XIX.',
      analisisTrama: [
        {
          titulo: 'El dilema del superhombre y la miseria asfixiante (Parte I)',
          detalle: 'Raskólnikov vive enclaustrado en un cuartucho miserable similar a un ataúd en San Petersburgo. El abandono de sus estudios, las deudas de alquiler y una carta de su madre anunciándole que su hermana Dunia va a casarse por conveniencia con el pedante Lujin para salvarlo de la ruina aceleran su obsesión. Rodión concibe la teoría de que los hombres superiores (como Napoleón) tienen el deber histórico de suprimir los obstáculos que dañan a la sociedad sin someterse a las leyes morales comunes.'
        },
        {
          titulo: 'El doble asesinato con el hacha en el departamento (Parte I - final)',
          detalle: 'Convencido de que la usurera Aliona Ivanovna es un "piojo social inútil" cuyo dinero puede financiar causas nobles, Raskólnikov acude a su vivienda con un hacha oculta bajo el abrigo. La asesina brutalmente de un hachazo en la cabeza para robar sus prendas de empeño. Sin embargo, el plan se desmorona cuando de forma imprevista entra a la habitación la hermana menor de la usurera, la bondadosa y desvalida Lizaveta, obligándolo a matarla también para no dejar testigos. Huye aterrado sin haber contado el botín.'
        },
        {
          titulo: 'El tormento del remordimiento y el cerco de Porfiri Petrovich (Partes II - III)',
          detalle: 'Incapaz de hacer uso del dinero y joyas robadas, Rodión las entierra bajo una piedra en un patio baldío. Es presa de delirios febriles, ataques de pánico y un aislamiento absoluto de sus seres queridos. Al ser citado por deudas a la comisaría, se desmaya al escuchar comentarios sobre el asesinato, llamando la atención de los agentes. Pronto entra en escena Porfiri Petrovich, sagaz juez de instrucción criminal que leyó el artículo publicado por Rodión sobre el hombre extraordinario; sin tener pruebas materiales directas, inicia un duelo psicológico implacable para cercar su mente.'
        },
        {
          titulo: 'La familia Marmeládov y la confesión a Sonia (Partes IV - V)',
          detalle: 'En medio de su desesperación, Rodión entabla contacto con la familia del alcohólico Marmeládov, a quien vio morir atropellado por un carruaje. Conoce allí a Sonia Marmeládova, una joven que se ha visto forzada a ejercer la prostitución para alimentar a sus hermanos hambrientos, conservando sin embargo una pureza evangélica y una fe conmovedora. Sintiéndose identificado con su sufrimiento, Raskólnikov cae de rodillas ante ella declarando: "No me he inclinado ante ti, me he inclinado ante todo el sufrimiento humano", y le confiesa en secreto ser el autor del doble homicidio. Sonia le implora que confiese públicamente su pecado para expiar su alma.'
        },
        {
          titulo: 'El suicidio de Svidrigáilov y el beso a la tierra en la plaza (Parte VI)',
          detalle: 'Aparece Svidrigáilov, antiguo empleador de Dunia y hombre libertino que encarna el nihilismo cínico y amoral; tras atormentar a la familia y verse rechazado por Dunia, termina suicidándose de un tiro en la cabeza, demostrando a Rodión el abismo insoportable de quien vive sin límites morales. Siguiendo el mandato de Sonia, Raskólnikov acude a la Plaza del Heno, se arrodilla y besa la tierra que manchó con sangre para pedir perdón ante el pueblo, presentándose inmediatamente después en la estación de policía para confesar sus crímenes.'
        },
        {
          titulo: 'El presidio siberiano y la resurrección moral (Epílogo)',
          detalle: 'Condenado a ocho años de trabajos forzados en una prisión de Siberia a orillas del río Irtish, Raskólnikov continúa inicialmente dominado por su orgullo intelectual, siendo despreciado por los presidiarios de extracción campesina. Sin embargo, la presencia abnegada y silenciosa de Sonia, quien lo sigue al destierro, termina por quebrantar su coraza. Bajo la luz del Evangelio y el relato de la resurrección de Lázaro, Rodión experimenta el milagro del renacimiento espiritual, comprendiendo que solo el amor desinteresado y el sufrimiento redentor pueden restituir su pertenencia a la humanidad.'
        }
      ],
      personajes: [
        { nombre: 'Rodión Románovich Raskólnikov', rol: 'Protagonista', descripcion: 'Exestudiante sumamente inteligente y taciturno cuya soberbia filosófica lo empuja a la barbarie, para luego renacer por la expiación.' },
        { nombre: 'Sonia Semiónovna Marmeládova', rol: 'Luz espiritual y redentora', descripcion: 'Muchacha sacrificada que acepta la humillación corporal para socorrer a su familia, encarnando la caridad evangélica incondicional.' },
        { nombre: 'Porfiri Petrovich', rol: 'Juez de instrucción criminal', descripcion: 'Brillante investigador que prescinde de la violencia física y emplea la dialéctica psicológica para que el culpable se entregue.' },
        { nombre: 'Dmitri Prokófich Razumijin', rol: 'Amigo incondicional', descripcion: 'Compañero generoso, leal y trabajador que protege a la madre y a la hermana de Rodión durante la crisis del protagonista.' },
        { nombre: 'Arkadi Ivánovich Svidrigáilov', rol: 'El doble oscuro', descripcion: 'Aristócrata depravado y nihilista que representa la disolución total del alma cuando no reconoce ninguna barrera moral.' },
        { nombre: 'Aliona Ivanovna', rol: 'Usurera prestamista', descripcion: 'Anciana usurera despiadada que explota la miseria de los estudiantes y maltrata a su hermana desvalida.' }
      ],
      temasClave: [
        { titulo: 'La teoría del hombre extraordinario', explicacion: 'La falacia de justificar medios aberrantes por fines teóricos altruistas; Dostoyevski refuta el utilitarismo al demostrar que ningún homicidio es compatible con la conciencia moral.' },
        { titulo: 'El verdadero castigo como aislamiento interior', explicacion: 'La pena penal en Siberia es liviana en comparación con el infierno de quedar apartado y desterrado espiritualmente de los seres humanos.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la novela psicológica universal. Narra el calvario psíquico de Rodión Raskólnikov tras asesinar a una usurera para comprobar su teoría del superhombre, culminando en su entrega a la justicia impulsado por el amor de Sonia y su redención en Siberia.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela psicológica' },
        { clave: 'Autor', valor: 'Fiódor Mijáilovich Dostoyevski (Moscú / San Petersburgo)' },
        { clave: 'Estructura', valor: 'Seis partes continuas y un epílogo' },
        { clave: 'Escenario principal', valor: 'San Petersburgo (barrios marginales de la Plaza del Heno) y penal de Siberia' },
        { clave: 'Significado del apellido', valor: 'Raskol = cisma, escisión o división de la personalidad' }
      ],
      elementosClave: [
        { titulo: 'El instrumento homicida', contenido: 'Un hacha tosca: desmiente la pretendida elegancia de su doctrina intelectual, evidenciando la carnicería real del acto.' },
        { titulo: 'La resurrección de Lázaro', contenido: 'Pasaje del Evangelio de Juan que Sonia lee a Raskólnikov en una humilde buhardilla, presagio de su renacimiento moral.' },
        { titulo: 'El beso a la tierra', contenido: 'Gesto de sumisión y penitencia pública en la encrucijada de San Petersburgo para pedir perdón a la Creación.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Raskólnikov no gasta ni un rublo del botín robado?',
          respuesta: 'Porque su motivación nunca fue el afán de enriquecimiento material, sino demostrarse a sí mismo si pertenecía al grupo de hombres extraordinarios capaces de franquear los límites éticos.'
        },
        {
          pregunta: '¿Por qué Sonia Marmeládova es la clave de la redención de Rodión?',
          respuesta: 'Porque ella encarna el amor cristiano puro que no juzga al pecador sino que carga voluntariamente con su sufrimiento para guiarlo a la reconciliación con Dios y con los hombres.'
        }
      ]
    }
  },
  {
    id: 'edipo-rey',
    titulo: 'Edipo Rey',
    autor: 'Sófocles',
    año: '429 a. C.',
    pais: 'Grecia Clásica',
    genero: 'Dramático',
    especie: 'Tragedia clásica',
    corriente: 'Clasicismo Griego',
    temaPrincipal: 'La inexorabilidad del destino fatal (ananké), la soberbia del orgullo humano (hibris) y la búsqueda incesante de la verdad.',
    portadaGradiente: 'linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'La ciudad de Tebas es azotada por una peste devastadora. El oráculo de Apolo revela que el mal solo cesará si se castiga al asesino impune del antiguo monarca Layo. El rey Edipo, amado por el pueblo por haber derrotado en el pasado al monstruo de la Esfinge, jura solemnemente dar con el culpable y desterrarlo. Sin embargo, a medida que interroga al adivino ciego Tiresias, a su esposa Yocasta y a antiguos pastores, descubre con horror que él mismo es el asesino de su padre biológico y el esposo de su propia madre, consumando involuntariamente la fatídica profecía divina.',
      contextoHistorico: 'Representada en las fiestas dionisíacas de Atenas en el siglo V a. C. Señalada por Aristóteles en su Poética como el modelo absoluto de la tragedia por la perfección de su estructura, la catarsis y la agudeza de su anagnórisis (reconocimiento).',
      analisisTrama: [
        {
          titulo: 'El clamor de Tebas y la sentencia del oráculo de Delfos (Prólogo)',
          detalle: 'Sacerdotes, ancianos y jóvenes se postran en las gradas del palacio de Tebas implorando la ayuda de Edipo. Una peste infame seca los vientres de las mujeres, pudre las cosechas y mata al ganado. Creonte, cuñado del rey, regresa de consultar el oráculo de Delfos con el dictamen de Apolo: la ciudad alberga una mancha de sangre (miasma) provocada por el asesinato del anterior rey Layo; el culpable vive dentro de las murallas y debe ser expulsado o ejecutado. Edipo promulga un edicto maldiciendo al culpable y a cualquiera que le dé cobijo.'
        },
        {
          titulo: 'El choque profético con Tiresias y la cólera de Edipo (Episodio I)',
          detalle: 'Edipo manda llamar a Tiresias, vidente venerable ciego de nacimiento. Éste rehúsa hablar en un inicio para evitarle una desdicha sin remedio, pero ante los insultos y acusaciones de Edipo (quien lo acusa de tramar un complot golpista junto con Creonte), Tiresias desata la verdad: "Tú eres el asesino que buscas y vives en torpe unión carnal con tus seres más queridos". Edipo desestima sus palabras atribuyéndolas a envidias políticas y soberbia senil.'
        },
        {
          titulo: 'La disputa con Creonte y la confidencia de Yocasta (Episodio II)',
          detalle: 'Creonte se presenta a defender su honra de las acusaciones de traición. La reina Yocasta interviene para separarlos. Para calmar a Edipo y demostrarle que las profecías humanas son falibles, Yocasta le revela que a Layo le profetizaron morir a manos de un hijo suyo, pero que el infante fue atado de los tobillos y arrojado a un abismo cuando tenía tres días, y que a Layo lo mataron unos salteadores extranjeros en una encrucijada donde se cruzan tres caminos en Fócida. Esta revelación hiela la sangre de Edipo: recuerda haber dado muerte a un anciano soberbio en una encrucijada exactamente idéntica cuando huía de Corinto.'
        },
        {
          titulo: 'La llegada del mensajero de Corinto y la falsa esperanza (Episodio III)',
          detalle: 'Llega un mensajero desde Corinto con la noticia de que el rey Pólibo ha muerto de vejez y que el pueblo aclama a Edipo como su nuevo soberano. Edipo respira aliviado creyendo que la profecía de matar a su padre se ha desmentido, pero manifiesta su terror a regresar por temor a consumar el incesto con su madre Mérope. El mensajero, queriendo tranquilizarlo, le confiesa que no debe temer porque Pólibo y Mérope no eran sus progenitores de sangre: él mismo recibió al bebé Edipo de manos de un pastor de Layo en el monte Citerón con los pies perforados con alfileres. Yocasta comprende en ese instante la atroz verdad, palidece y huye a sus aposentos gritando de dolor.'
        },
        {
          titulo: 'El testimonio del pastor de Layo y la anagnórisis (Episodio IV)',
          detalle: 'Edipo insiste en conocer su linaje original y manda traer a la fuerza al viejo pastor que custodiaba los rebaños de Layo. Ante las amenazas de tortura, el anciano confiesa con lágrimas que el niño que entregó al mensajero de Corinto no era un esclavo, sino el propio hijo nacido de Layo y Yocasta, entregado para ser asesinado debido al vaticinio de que mataría a su padre. Edipo comprende su tragedia en toda su dimensión: "¡Ay de mí! ¡Todo se ha cumplido! ¡Luz, ojalá te viera por última vez!".'
        },
        {
          titulo: 'El suicidio de Yocasta, la ceguera autoimpuesta y el destierro (Éxodo)',
          detalle: 'Un mensajero de palacio anuncia la catástrofe interior: enloquecida, Yocasta se ha colgado con una soga de las vigas del lecho nupcial. Edipo irrumpe derribando las puertas, descuelga el cadáver de su madre y esposa, arranca los broches de oro de su túnica y se clava repetidas veces las agujas en los ojos exclamando que sus pupilas no deben contemplar jamás ni sus propios crímenes ni el dolor de sus hijos. Ciego y bañado en sangre, suplica a Creonte que lo expulse de Tebas hacia el monte Citerón y abraza llorando a sus hijas pequeñas Antígona e Ismene, mientras el coro concluye que ningún mortal debe considerarse dichoso antes de contemplar el día final de su existencia.'
        }
      ],
      personajes: [
        { nombre: 'Edipo', rol: 'Rey de Tebas', descripcion: 'Soberano abnegado y valiente pero soberbio (hibris), implacable en su búsqueda de la verdad hasta descubrir su propia condenación.' },
        { nombre: 'Yocasta', rol: 'Reina consorte y madre', descripcion: 'Mujer inteligente y escéptica de los oráculos que comprende el horror antes que nadie y elige la muerte por ahorcamiento.' },
        { nombre: 'Creonte', rol: 'Hermano de Yocasta', descripcion: 'Noble prudente, ecuánime y respetuoso de la legalidad y los mandatos divinos, asume la regencia tras la caída de Edipo.' },
        { nombre: 'Tiresias', rol: 'Adivino ciego', descripcion: 'Vidente de Apolo desprovisto de ojos físicos pero dueño de la lucidez espiritual, portavoz de la justicia cósmica inmutable.' },
        { nombre: 'Pastor de Layo', rol: 'Testigo anciano', descripcion: 'Siervo piadoso que por compasión perdonó la vida al recién nacido, convirtiéndose involuntariamente en el puente de la tragedia.' }
      ],
      temasClave: [
        { titulo: 'El destino inexorable (Ananké)', explicacion: 'Toda acción calculada por la soberbia humana para evadir los designios de los dioses opera como el vehículo exacto de su cumplimiento.' },
        { titulo: 'La dialéctica de la ceguera y la visión', explicacion: 'Quien tiene ojos materiales vive ciego ante su propia realidad moral; al perder la vista terrenal, se adquiere la desgarradora visión interior.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Tragedia arquetípica del teatro griego clásico. Estructurada como una investigación deductiva donde el propio rey juez resulta ser el criminal profetizado que asesinó a su padre Layo y desposó a su madre Yocasta, culminando en la ceguera voluntaria y el exilio.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Tragedia griega' },
        { clave: 'Autor', valor: 'Sófocles (Colono, Atenas)' },
        { clave: 'Tres unidades clásicas', valor: 'Unidad de tiempo (un día), lugar (frontis del palacio) y acción única' },
        { clave: 'Efecto catártico', valor: 'Purificación espiritual provocada por la piedad y el terror en los espectadores' },
        { clave: 'Mecanismo dramático', valor: 'Anagnórisis (paso instantáneo de la ignorancia al reconocimiento fatal)' }
      ],
      elementosClave: [
        { titulo: 'Etimología del nombre', contenido: 'Edipo significa "el de los pies hinchados", referencia a las perforaciones en sus tobillos infantiles al ser atado en el Citerón.' },
        { titulo: 'El enigma de la Esfinge', contenido: 'Criatura que camina a cuatro patas al alba, dos al mediodía y tres al ocaso. Respuesta de Edipo: El Hombre en sus edades.' },
        { titulo: 'La automutilación ocular', contenido: 'Se arranca los ojos con los broches de oro de Yocasta para no tener que mirar en el Hades el rostro de los padres ultrajados.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Edipo huyó en su juventud de Corinto?',
          respuesta: 'Para no cumplir el oráculo que le vaticinó que mataría a su padre y se casaría con su madre, creyendo falsamente que sus padres eran los reyes de Corinto, Pólibo y Mérope.'
        },
        {
          pregunta: '¿Por qué se considera la tragedia perfecta según Aristóteles?',
          respuesta: 'Porque la anagnórisis (reconocimiento de la identidad) y la peripecia (cambio radical de la fortuna del rey de la gloria a la miseria) ocurren simultáneamente en el clímax dramático.'
        }
      ]
    }
  },
  {
    id: 'la-metamorfosis',
    titulo: 'La metamorfosis',
    autor: 'Franz Kafka',
    año: '1915',
    pais: 'República Checa (Imperio Austrohúngaro)',
    genero: 'Narrativo',
    especie: 'Novela corta',
    corriente: 'Vanguardismo / Expresionismo',
    temaPrincipal: 'La alienación del individuo en la sociedad moderna, la deshumanización laboral y el descarte familiar ante la pérdida de utilidad.',
    portadaGradiente: 'linear-gradient(145deg, #1c1917 0%, #292524 50%, #44403c 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Una mañana, Gregorio Samsa, un abnegado viajante de comercio que sostiene económicamente a sus padres y a su hermana menor Grete, despierta convertido en un monstruoso insecto. Atrapado en su nuevo caparazón, pierde su empleo y es recluido en su dormitorio. Pese a conservar intacta su sensibilidad afectiva humana, su familia pasa gradualmente del desconcierto compasivo al asco, la violencia física y el resentimiento, abandonándolo hasta su muerte solitaria, tras la cual la familia experimenta un perturbador renacer vital.',
      contextoHistorico: 'Escrita en 1912 y publicada en plena Primera Guerra Mundial. Sintetiza la atmósfera de angustia burocrática, la soledad ontológica y la cosificación del ser humano propia del siglo XX industrializado.',
      analisisTrama: [
        {
          titulo: 'El despertar absurdo y la angustia de la puntualidad (Parte I)',
          detalle: 'Gregorio Samsa se despierta sobre sus espaldas duras de caparazón y contempla su vientre arqueado y sus numerosas patas delgadas. Sorprendentemente, su principal preocupación no es la monstruosa mutación anatómica que padece, sino constatar en el reloj que ha perdido el tren de las cinco de la mañana y que llegará tarde a su empleo. Reflexiona sobre la explotación agobiante que sufre como viajante para pagar una antigua deuda contraída por sus padres con su jefe, un trabajo que detesta pero del que depende la subsistencia de toda la casa.'
        },
        {
          titulo: 'La llegada del apoderado y el rechazo violento del padre (Parte I - final)',
          detalle: 'Ante su retraso, el apoderado de la empresa comercial llega en persona a la vivienda a exigir explicaciones y acusarlo de incompetencia. Los familiares golpean angustiados la puerta del cuarto. Con inmenso esfuerzo corporal y utilizando sus mandíbulas desprovistas de dientes, Gregorio logra girar la llave y abrir la puerta. La visión es devastadora: el apoderado retrocede horrorizado y huye precipitadamente por las escaleras; la madre cae desmayada sobre la alfombra, y el padre, enfurecido, toma el bastón del visitante y un periódico y empuja al insecto a golpes de regreso a la habitación, hiriéndolo en un costado al cerrar violentamente la puerta.'
        },
        {
          titulo: 'El cuidado inicial de Grete y la pérdida progresiva de la voz (Parte II)',
          detalle: 'Encerrado en su cuarto a oscuras, Gregorio comprueba que ha perdido el gusto por la leche fresca y que solo apetece restos de comida descompuesta. Su hermana menor Grete asume la tarea de alimentarlo y limpiar la habitación con un trapo, aunque cubriéndose el rostro con espanto. Con el paso de los días, la voz de Gregorio se transforma en un chirrido animal ininteligible, consumando su incomunicación con el mundo exterior. El muchacho pasa las horas oculto bajo un canapé para no herir la vista de su hermana.'
        },
        {
          titulo: 'El retiro de los muebles y el bombardeo de manzanas (Parte II - final)',
          detalle: 'Para facilitarle el desplazamiento por las paredes y el techo, Grete convence a la madre de vaciar los muebles de la habitación. Gregorio experimenta una angustia atroz al ver cómo desmantelan los recuerdos de su vida civilizada; en un intento desesperado por salvar algo, trepa a la pared y cubre con su cuerpo el cuadro de una dama vestida con pieles. La madre entra, lo ve y se desploma sin sentido. En ese instante regresa el padre, ataviado con su nuevo uniforme de ordenanza bancaria; creyendo que el monstruo intentó atacar a la madre, persigue a Gregorio arrojándole manzanas de la mesa; una de ellas se clava profundamente en el lomo del insecto y queda allí pudriéndose, dejándolo lisiado y gravemente enfermo.'
        },
        {
          titulo: 'Los huéspedes aristocráticos y el canto del violín (Parte III)',
          detalle: 'Debilitado por la manzana infectada en su carne, Gregorio vive confinado en una habitación convertida en depósito de trastos viejos y suciedad. La familia alquila una habitación a tres meticulosos y soberbios caballeros para obtener ingresos. Una noche, Grete toca el violín en la sala para los huéspedes; conmovido por la melodía, Gregorio se desliza sigilosamente hacia la luz pensando con infinita ternura que si la música lo emociona con tanta intensidad no puede ser un animal. Sin embargo, los huéspedes descubren al inmundo insecto, se indignan por la falta de higiene y cancelan de inmediato el arriendo amenazando con demandas legales.'
        },
        {
          titulo: 'La sentencia de Grete, la muerte silenciosa y la liberación familiar (Parte III - final)',
          detalle: 'Grete estalla en llanto y declara categóricamente a sus padres que deben liberarse de "esa bestia" y dejar de pensar que se trata de Gregorio: "Si fuera él, habría comprendido hace tiempo que los hombres no pueden vivir con semejante alimaña y se habría marchado voluntariamente". Resignado y consumido por la pena, Gregorio regresa penosamente a su cuarto en la oscuridad; pensando en su familia con amor puro y sin rencor alguno, exhala su último aliento al amanecer. La criada encuentra su cuerpo reseco y lo arroja a la basura. Los padres y Grete deciden tomarse el día libre, abordan un tranvía hacia las afueras y contemplan con alegría cómo la joven Grete ha florecido como una hermosa mujer a quien ya es momento de casar.'
        }
      ],
      personajes: [
        { nombre: 'Gregorio Samsa', rol: 'Protagonista transformado', descripcion: 'Empleado sumiso que carga con el bienestar familiar, víctima del descarte social cuando su cuerpo pierde capacidad productiva.' },
        { nombre: 'Grete Samsa', rol: 'Hermana menor', descripcion: 'Comienza como su abnegada protectora para transformarse luego en quien decreta formalmente la necesidad de deshacerse de él.' },
        { nombre: 'Señor Samsa', rol: 'Padre autoritario', descripcion: 'Hombre severo y endeudado que recupera su autoridad despótica tras la caída del hijo, hiriéndolo de gravedad.' },
        { nombre: 'Señora Samsa', rol: 'Madre débil', descripcion: 'Mujer enferma desgarrada entre el afecto instintivo y el asco visceral que le provoca la figura del insecto.' }
      ],
      temasClave: [
        { titulo: 'La cosificación y deshumanización económica', explicacion: 'El afecto de la familia estaba condicionado a la nómina de Gregorio; cuando deja de aportar ingresos, deja de ser considerado una persona.' },
        { titulo: 'El absurdo kafkiano y la culpa', explicacion: 'La tragedia no radica en la transformación fantástica en sí, sino en la naturalidad cotidiana con que los personajes asumen la injusticia.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Monumento del expresionismo y la narrativa del absurdo. Relata el drama de Gregorio Samsa, quien tras amanecer convertido en un insecto gigante es recluido, herido por su propio padre con una manzana y condenado a la muerte solitaria por el rechazo de su hermana y su familia.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela corta' },
        { clave: 'Autor', valor: 'Franz Kafka (Praga, Bohemia)' },
        { clave: 'Término original alemán', valor: 'Ungeziefer (bicho inmundo, parásito indeseable)' },
        { clave: 'Estructura tripartita', valor: 'Parte I (el choque), Parte II (la reclusión), Parte III (el descarte final)' }
      ],
      elementosClave: [
        { titulo: 'La herida de la manzana', contenido: 'La manzana arrojada por el padre que se descompone en la espalda simboliza la agresión destructiva de la autoridad patriarcal.' },
        { titulo: 'El violín y la condición humana', contenido: '"¿Era acaso un animal si la música lo conmovía de ese modo?", meditación capital sobre la persistencia del alma frente a la forma física.' },
        { titulo: 'El final liberador para la familia', contenido: 'El paseo campestre y la vitalidad de Grete confirman que la muerte de Gregorio significó un alivio material para los suyos.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Kafka nunca detalla científicamente la anatomía del insecto?',
          respuesta: 'Para preservar su dimensión metafórica: Gregorio no es un espécimen zoológico, sino el reflejo de la exclusión, la culpa y la degradación existencial.'
        },
        {
          pregunta: '¿Cuál es la causa inmediata que precipita la muerte de Gregorio?',
          respuesta: 'La combinación de la inanición provocada por la falta de alimento, la herida purulenta de la manzana y, fundamentalmente, la desgarradora condena verbal de su hermana Grete declarando que debían desecharlo.'
        }
      ]
    }
  },
  {
    id: 'paco-yunque',
    titulo: 'Paco Yunque',
    autor: 'César Vallejo',
    año: '1931',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Cuento',
    corriente: 'Vanguardismo / Narrativa Social',
    temaPrincipal: 'El abuso infantil, la injusticia clasista y la complicidad servil de las autoridades escolares frente al poder económico.',
    portadaGradiente: 'linear-gradient(145deg, #1e3a8a 0%, #172554 50%, #0f172a 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'Paco Yunque, un niño campesino de condición humilde trasladado a la ciudad para acompañar y servir al mimado Humberto Grieve, asiste por primera vez a una escuela fiscal. En el aula experimenta desconcierto y temor, haciéndose amigo del solidario Paco Fariña. Sin embargo, Humberto Grieve lo agrede, lo jalonea y le roba descaradamente su examen escolar resuelto. El maestro premia injustamente al niño rico con el ingreso al Cuadro de Honor, mientras Paco Yunque queda sumido en una impotencia amarga y silenciosa.',
      contextoHistorico: 'Escrito en Madrid en 1931 y rechazado por la editorial Cenit por considerarlo "demasiado triste y desgarrador para el público infantil". Es el relato de crítica social de mayor resonancia en la educación peruana.',
      analisisTrama: [
        {
          titulo: 'El ingreso traumático a la escuela fiscal',
          detalle: 'Paco Yunque llega por primera vez a una escuela de pueblo tomado de la mano de su madre, empleada doméstica de los patrones Grieve. Acostumbrado al silencio del campo andino, el bullicio atronador de centenares de niños corriendo, gritando y forcejeando en el patio lo llena de desconcierto y parálisis física. Se queda pegado a la pared con el rostro pálido hasta que el toque de campana conmina a formar filas hacia las aulas.'
        },
        {
          titulo: 'El aula y la fraternidad de Paco Fariña',
          detalle: 'En el salón de clases, el profesor ubica a Paco Yunque en el primer pupitre junto a Paco Fariña. Fariña, despierto y bondadoso, toma de la mano al recién llegado, le pregunta su nombre y le muestra sus lápices y cuadernos para infundirle confianza. Paco Yunque empieza a sentirse seguro al hallar un protector solidario frente a la severidad del profesor.'
        },
        {
          titulo: 'La irrupción despótica de Humberto Grieve',
          detalle: 'Humberto Grieve, hijo de don Dorian Grieve (gerente inglés de los ferrocarriles de la Peruvian Corporation), llega con descarado retraso al salón. El maestro, en vez de reprenderlo, lo saluda afablemente y con servilismo. Humberto se acerca a la carpeta de Fariña, agarra violentamente del brazo a Paco Yunque y exige que se siente con él, alegando con prepotencia patronal: "Paco es mi muchacho y mi madre me ha mandado que lo tenga conmigo". Fariña protesta enérgicamente ante la agresión.'
        },
        {
          titulo: 'La doble moral y la parcialidad del maestro',
          detalle: 'El profesor impone su autoridad obligando a Paco Yunque a sentarse con Grieve para complacer al niño adinerado. Instantes después, hace su entrada otro alumno, Antonio Gresdres, hijo de un modesto albañil, quien se atrasó por cumplir mandados de su madre enferma. El maestro estalla en cólera, no acepta explicaciones y castiga al niño humilde obligándolo a permanecer de pie durante una hora frente a la pizarra, desnudando ante todo el salón su descarado servilismo hacia los poderosos.'
        },
        {
          titulo: 'El recreo salvaje y la sustracción de la tarea',
          detalle: 'Durante el recreo en el patio escolar, Humberto Grieve somete a Paco Yunque a patadas, saltos y tirones de oreja utilizándolo como su caballo de tiro. Fariña interviene con indignación y los hermanos Zumiga se trenzan a golpes con Humberto para frenar el abuso. Al reanudarse la clase, el maestro encarga redactar una prueba sobre los peces. Paco Yunque trabaja con pulcritud y esmero, mientras Humberto holgazanea haciendo borrones. En un descuido de Yunque al salir del aula, Grieve roba sigilosamente la hoja de su sirviente, borra su nombre y escribe con tinta "Humberto Grieve".'
        },
        {
          titulo: 'El Cuadro de Honor y las lágrimas de la impotencia',
          detalle: 'El Director del plantel ingresa solemnemente a inspeccionar las calificaciones. El maestro exhibe con orgullo el ejercicio firmado por Humberto Grieve calificándolo como el mejor trabajo de la escuela. El Director felicita al niño rico y dispone que su nombre sea inscrito en el Cuadro de Honor con la máxima distinción. Al buscar su prueba, Paco Yunque no la encuentra y el maestro lo reprende tildándolo de holgazán mentiroso y castigándolo. Paco apoya su cabeza sobre sus brazos en la carpeta y rompe en un llanto amargo, mientras Fariña le dice impotente: "¡No llores, Paco! ¡No llores! ¡Déjalo a ese granuja!".'
        }
      ],
      personajes: [
        { nombre: 'Paco Yunque', rol: 'Protagonista indefenso', descripcion: 'Hijo de la sirvienta de los Grieve; tímido, aplicado y bondadoso, recibe pasivamente las agresiones de la estructura clasista.' },
        { nombre: 'Humberto Grieve', rol: 'Antagonista soberbio', descripcion: 'Hijo de un magnate inglés; mimado, holgazán y déspota que asume que las leyes y las personas le pertenecen por herencia económica.' },
        { nombre: 'Paco Fariña', rol: 'Voz de la justicia', descripcion: 'Compañero noble y combativo que desafía la mentira, defiende a Yunque y denuncia la hipocresía del sistema escolar.' },
        { nombre: 'El Maestro', rol: 'Autoridad sumisa', descripcion: 'Profesor servil frente al poder del dinero y despótico con los alumnos pobres, garante de la desigualdad social.' }
      ],
      temasClave: [
        { titulo: 'El simbolismo del apellido Yunque', explicacion: 'El yunque es la herramienta de hierro que recibe pasivamente todos los golpes sin devolver ninguno, metáfora de la masa proletaria oprimida.' },
        { titulo: 'La educación como reproductora de desigualdades', explicacion: 'La escuela fiscal no emancipa ni iguala a los niños; consagra y premia el despojo de los poderosos sobre los débiles.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cuento cumbre de la narrativa social peruana. Retrata la humillación sufrida por el niño campesino Paco Yunque a manos del déspota Humberto Grieve, quien le roba su prueba escolar para obtener el Cuadro de Honor gracias a la sumisión cobarde del maestro.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Cuento social' },
        { clave: 'Autor', valor: 'César Abraham Vallejo Mendoza (Santiago de Chuco)' },
        { clave: 'Año de redacción', valor: '1931 (Publicado póstumamente en 1951)' },
        { clave: 'Escenario', valor: 'El aula y el patio de una escuela fiscal de provincia' },
        { clave: 'Conflicto central', valor: 'El clasismo y el robo impune del examen de redacción' }
      ],
      elementosClave: [
        { titulo: 'Contraste de impunidad escolar', contenido: 'Grieve llega tarde y es recibido con honores; Antonio Gresdres llega tarde por cuidar a su madre enferma y es castigado de pie.' },
        { titulo: 'La dignidad de Paco Fariña', contenido: 'Encarna la solidaridad y la rebeldía que no se resigna ante el atropello injusto.' },
        { titulo: 'El dolor infantil mudo', contenido: 'El llanto final de Paco Yunque no es cobardía; es la expresión del desamparo absoluto del desposeído.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Humberto Grieve cree tener derecho de maltratar a Paco Yunque?',
          respuesta: 'Porque su madre es la sirvienta de la mansión familiar y el niño rico ha sido educado bajo el principio colonial de que los sirvientes son objetos de su propiedad.'
        },
        {
          pregunta: '¿Qué le robó Humberto a Paco Yunque para ganar el Cuadro de Honor?',
          respuesta: 'Su ejercicio de caligrafía y redacción sobre los peces, borrando el nombre de Paco y sustituyéndolo por el suyo.'
        }
      ]
    }
  },
  {
    id: 'ollantay',
    titulo: 'Ollantay',
    autor: 'Anónimo (Manuscrito del padre Antonio Valdés)',
    año: 'Siglo XVIII (Tradición dramática quechua)',
    pais: 'Perú',
    genero: 'Dramático',
    especie: 'Drama en verso',
    corriente: 'Teatro Colonial Quechua',
    temaPrincipal: 'El amor rebelde que desafía las barreras de casta social y la transición del poder autoritario a la clemencia y perdón gubernamental.',
    portadaGradiente: 'linear-gradient(145deg, #7c2d12 0%, #c2410c 50%, #431407 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'Ollantay, victorioso general plebeyo del Antisuyo y héroe militar del Tahuantinsuyo, se enamora apasionadamente de la princesa Cusi Coyllur, hija del Inca Pachacútec. Debido a las rígidas leyes de casta dinástica, Pachacútec rechaza con furia su propuesta matrimonial y recluye a su hija en una celda secreta del Acllahuasi. Ofendido, Ollantay encabeza una rebelión armada y se atrinchera en Ollantaytambo durante diez años. Tras la muerte de Pachacútec, el general Rumiñahui captura a los rebeldes mediante una astuta trampa sangrienta. Sin embargo, el nuevo Inca Túpac Yupanqui perdona noblemente al héroe y consagra su unión con Cusi Coyllur y su hija Ima Súmac.',
      contextoHistorico: 'Existen tres hipótesis filológicas sobre su composición: Incanista (obra prehispánica pura conservada por vía oral), Hispanista (creación colonial española con estructura de comedia del Siglo de Oro) e Intermedia (argumento y mitos incaicos adaptados al verso castellano en el siglo XVIII).',
      analisisTrama: [
        {
          titulo: 'El amor secreto y la advertencia del Huillac Umu (Acto I)',
          detalle: 'En el Cusco, Ollantay confiesa a su gracioso criado Piqui Chaqui su pasión oculta por la princesa Cusi Coyllur. El sumo sacerdote Huillac Umu descubre la transgresión mediante augurios divinos y le suplica que sofoque ese sentimiento, recordándole que ella es de linaje divino y él un simple plebeyo (runa). Mientras tanto, Cusi Coyllur llora desconsolada en brazos de su madre Anahuarqui presintiendo las represalias de su padre el Inca.'
        },
        {
          titulo: 'La petición rechazada y el confinamiento en el Acllahuasi (Acto I - clímax)',
          detalle: 'Tras recibir elogios imperiales por sus gloriosas campañas militares, Ollantay se atreve a solicitar la mano de Cusi Coyllur ante Pachacútec. El monarca arde en cólera, desprecia al general por su origen plebeyo y lo expulsa de la corte ordenándole recordar su condición subalterna. En castigo, Pachacútec encierra a Cusi Coyllur en una mazmorra del Acllahuasi (casa de las escogidas), donde da a luz a su hija Ima Súmac en la soledad y la tiniebla.'
        },
        {
          titulo: 'La maldición del Cusco y la insurrección en Ollantaytambo (Acto I - final)',
          detalle: 'Lleno de indignación por la soberbia del emperador, Ollantay maldice a la ciudad imperial: "¡Cusco, desde hoy seré tu mortal enemigo; romperé tu pecho en pedazos!". Marcha velozmente hacia el Antisuyo, donde los pueblos rebeldes lo aclaman y lo coronan con la mascapaicha como su rey. Ollantay fortifica la ciudadela de Ollantaytambo para resistir el avance de las tropas cusqueñas.'
        },
        {
          titulo: 'La derrota militar de Rumiñahui y el paso del tiempo (Acto II)',
          detalle: 'Pachacútec envía al general Rumiñahui ("Ojo de Piedra") al mando de un nutrido ejército imperial para aplastar la sublevación. Sin embargo, en un estrecho desfiladero andino, las fuerzas de Ollantay emboscan a los cusqueños arrojando rocas y troncos desde los riscos, infligiendo una vergonzosa derrota a Rumiñahui. Pasan diez años de guerra de posiciones; el anciano Pachacútec muere y su hijo, el joven y clemente Túpac Yupanqui, asciende al trono imperial.'
        },
        {
          titulo: 'La trampa sangrienta de Rumiñahui y la caída de Ollantaytambo (Acto III)',
          detalle: 'Decidido a limpiar su honor militar ante el nuevo Inca, Rumiñahui idea una maquiavélica estratagema: se flagela el cuerpo y se corta el rostro para presentarse ensangrentado y lastimoso ante las puertas de Ollantaytambo. Finge ante Ollantay haber sido víctima de la tiranía del nuevo emperador Túpac Yupanqui. El generoso Ollantay le cree, cura sus heridas y lo acoge en la celebración de la fiesta del Inti Raymi. En medio de la embriaguez general de la noche, Rumiñahui abre las puertas de la fortaleza al ejército imperial emboscado, capturando a Ollantay y a todos sus capitanes encadenados.'
        },
        {
          titulo: 'El juicio de honor, la revelación de Ima Súmac y la clemencia universal (Acto III - desenlace)',
          detalle: 'Ollantay es conducido ante el trono de Túpac Yupanqui en el Cusco; Rumiñahui exige la pena de muerte inmediata. Túpac Yupanqui, tras deliberar sobre el valor histórico del guerrero, ejecuta un acto sublime de magnanimidad: ordena retirar las cadenas, le restituye sus honores y lo nombra corregidor supremo del imperio. En ese momento culminante, irrumpe la niña Ima Súmac implorando piedad por una mujer que agoniza atada a un muro subterráneo. El séquito se traslada al Acllahuasi, donde descubren a la sufriente Cusi Coyllur; Túpac Yupanqui reconoce asombrado a su hermana perdida y bendice con emoción paternal el matrimonio entre Ollantay y la princesa, restituyendo la paz y la dicha colectiva.'
        }
      ],
      personajes: [
        { nombre: 'Ollantay', rol: 'General del Antisuyo', descripcion: 'Guerrero invicto, noble y leal que se rebela con honor ante el desprecio clasista del autócrata imperial.' },
        { nombre: 'Cusi Coyllur', rol: 'Princesa incaica ("Estrella Alegre")', descripcion: 'Hija predilecta de Pachacútec que padece diez años de riguroso encarcelamiento sin traicionar su amor.' },
        { nombre: 'Pachacútec', rol: 'Inca tiránico y severo', descripcion: 'Gobernante absoluto que antepone las leyes de casta cerrada a los méritos humanos y victorias militares.' },
        { nombre: 'Túpac Yupanqui', rol: 'Inca magnánimo', descripcion: 'Sucesor del trono que sustituye la venganza por la clemencia, símbolo del gobernante sabio y pacificador.' },
        { nombre: 'Rumiñahui', rol: 'General cusqueño ("Ojo de Piedra")', descripcion: 'Militar astuto y rencoroso que recurre al engaño para derrotar a su rival tras perder en combate abierto.' },
        { nombre: 'Piqui Chaqui', rol: 'Criado gracioso ("Pie de Pulga")', descripcion: 'Personaje cómico que aporta ironía, picardía y sentido común popular a las tensiones dramáticas.' },
        { nombre: 'Ima Súmac', rol: 'Hija del amor rebelde ("Qué Hermosa")', descripcion: 'Niña huérfana de diez años que descubre a su madre en las mazmorras y logra conmover el corazón del Inca.' }
      ],
      temasClave: [
        { titulo: 'El conflicto de casta y el poder político', explicacion: 'La contradicción entre la aristocracia de sangre real del Cusco y la nobleza de mérito militar plebeyo.' },
        { titulo: 'La clemencia como valor supremo del Estado', explicacion: 'La victoria moral de la reconciliación y el perdón de Túpac Yupanqui sobre la tiranía sanguinaria de su padre Pachacútec.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Máximo monumento del drama colonial quechua. Escenifica el amor prohibido entre el general plebeyo Ollantay y la princesa Cusi Coyllur, resuelto tras una década de rebelión gracias a la clemencia magnánima del Inca Túpac Yupanqui.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Drama en tres actos' },
        { clave: 'Lengua original', valor: 'Quechua clásico cuzqueño' },
        { clave: 'Métrica poética', valor: 'Versos octosílabos con rima asonante' },
        { clave: 'Figura cómica', valor: 'Piqui Chaqui (influencia del gracioso de la comedia española)' },
        { clave: 'Descubridor del manuscrito', valor: 'Sacerdote Antonio Valdés (Sicuani, siglo XVIII)' }
      ],
      elementosClave: [
        { titulo: 'Estratagema de Rumiñahui', contenido: 'Fingir haber sido ultrajado y flagelado por el nuevo Inca para infiltrarse en Ollantaytambo y abrir las puertas a traición.' },
        { titulo: 'Significado de los nombres quechuas', contenido: 'Ollantay (guerrero del Antisuyo), Cusi Coyllur (Estrella Alegre), Rumiñahui (Ojo de Piedra), Piqui Chaqui (Pie de Pulga).' },
        { titulo: 'El papel de Ima Súmac', contenido: 'La niña opera como catalizador dramático que conduce a Túpac Yupanqui a la mazmorra y hace posible la reconciliación.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Pachacútec rechaza enfurecido el matrimonio de Ollantay y Cusi Coyllur?',
          respuesta: 'Porque las leyes imperiales prohibían terminantemente que una ñusta de sangre solar divina emparentara con un hombre de condición plebeya (runa).'
        },
        {
          pregunta: '¿Qué diferencia a Túpac Yupanqui de su padre Pachacútec?',
          respuesta: 'Pachacútec gobernaba con autoritarismo inflexible y rigor punitivo de casta, mientras que Túpac Yupanqui prioriza la clemencia, la justicia moral y la integración pacífica del imperio.'
        }
      ]
    }
  },
  {
    id: 'la-iliada',
    titulo: 'La Ilíada',
    autor: 'Homero',
    año: 'Siglo VIII a. C.',
    pais: 'Grecia Clásica',
    genero: 'Épico',
    especie: 'Epopeya heroica',
    corriente: 'Clasicismo Griego',
    temaPrincipal: 'La cólera destructiva de Aquiles y sus trágicas consecuencias en el décimo año del asedio aqueo a Troya.',
    portadaGradiente: 'linear-gradient(145deg, #7c2d12 0%, #b45309 50%, #1e1b4b 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'En el décimo y último año del asedio a Troya (Ilión), surge una enconada disputa entre el comandante en jefe de las tropas aqueas, Agamenón, y el héroe más formidable de Grecia, Aquiles. Tras ser despojado injustamente de su botín de guerra, la doncella Briseida, Aquiles se retira encolerizado del combate, provocando derrotas masivas a manos del príncipe troyano Héctor. La muerte en batalla de su entrañable amigo Patroclo reaviva la furia de Aquiles, quien retorna para matar a Héctor, profanar su cadáver y finalmente acceder a devolverlo al anciano rey Príamo tras un conmovedor diálogo sobre la fragilidad del destino humano.',
      contextoHistorico: 'Compuesta en hexámetros dactílicos en la Jonia del siglo VIII a. C. sobre la base de tradiciones orales micénicas. Estableció los fundamentos de la mitología, el concepto del honor heroico (areté / kleos) y la literatura de Occidente.',
      analisisTrama: [
        {
          titulo: 'La ofensa de Agamenón, la peste de Apolo y el retiro de Aquiles (Cantos I - IV)',
          detalle: 'Crises, sacerdote de Apolo, llega al campamento aqueo ofreciendo rescate por su hija Criseida; Agamenón lo despide con insolencia y amenazas. En represalia, Apolo desata una terrible plaga de flechas ardientes durante nueve días sobre el ejército griego. El adivino Calcas revela la causa y Agamenón acepta devolver a Criseida, pero exige a cambio a Briseida, la doncella cautiva entregada a Aquiles. Herido en su honra (timé), Aquiles desenvaina su espada pero Atenea lo contiene tirándole de sus rubios cabellos. Aquiles jura solemnemente no volver a pelear y su madre Tetis obtiene de Zeus la promesa de otorgar la victoria a los troyanos hasta que los griegos reconozcan la falta cometida.'
        },
        {
          titulo: 'El duelo de Paris y Menelao y las batallas de los dioses (Cantos V - VIII)',
          detalle: 'Ambos bandos pactan dirimir el conflicto mediante un combate singular entre Menelao y Paris, el raptor de Helena. Cuando Menelao está a punto de vencer y matar a Paris, la diosa Afrodita envuelve a su protegido en una nube mágica y lo traslada sano y salvo a los aposentos de Helena. La tregua se rompe cuando el arquero troyano Pándaro hiere a Menelao por instigación divina. Se generaliza el combate salvaje: Diomedes hiere a las divinidades Afrodita y Ares, y Héctor alienta a los troyanos empujando a los griegos hacia la orilla del mar.'
        },
        {
          titulo: 'La embajada frustrada y el asalto troyano a las naves aqueas (Cantos IX - XV)',
          detalle: 'Desesperado ante el inminente desastre, Agamenón envía una distinguida embajada integrada por Odiseo, Áyax Telamonio y el anciano Fénix a la tienda de Aquiles, ofreciéndole inmensas riquezas, la restitución intacta de Briseida y la mano de una de sus hijas. Aquiles, inflexible en su resentimiento, rechaza la oferta afirmando que nada compensa una vida truncada por la ingratitud. Héctor rompe los muros del campamento griego arrojando una roca colosal y ordena incendiar los barcos; el humo de las primeras naves en llamas anuncia la destrucción total de los aqueos.'
        },
        {
          titulo: 'El sacrificio de Patroclo y el clímax del dolor (Cantos XVI - XVII)',
          detalle: 'Patroclo, conmovido hasta las lágrimas por la masacre de sus compatriotas heridos, suplica a Aquiles que le permita acudir al combate vistiendo su formidable armadura para atemorizar a los enemigos. Aquiles consiente advirtiéndole que solo aleje el fuego de las naves y no intente escalar las murallas de Ilión. Patroclo siembra el pánico y mata a Sarpedón, hijo de Zeus, pero llevado por la euforia avanza hasta las puertas de Troya; el dios Apolo lo golpea por la espalda despojándolo del casco y el escudo, Euforbo lo hiere y Héctor le propina la lanzada mortal. En su último aliento, Patroclo vaticina a Héctor que su propia muerte a manos de Aquiles está muy cerca.'
        },
        {
          titulo: 'Las nuevas armas de Hefesto y el regreso despiadado de Aquiles (Cantos XVIII - XXI)',
          detalle: 'Al enterarse de la muerte de su amado Patroclo, Aquiles cae en la tierra cubriéndose de ceniza y profiere un alarido tan espantoso que sacude las profundidades marinas. Su cólera contra Agamenón se transforma en un deseo ciego de venganza contra Héctor. La diosa Tetis viaja al Olimpo y encarga al dios herrero Hefesto la fabricación de una armadura divina y un escudo portentoso donde está cincelado todo el cosmos y la vida humana. Aquiles se reconcilia formalmente con Agamenón, monta en su carro y siembra una matanza inaudita tiñendo de sangre las aguas del río Escamandro, que llega a rebelarse en forma de torrente para intentar ahogarlo.'
        },
        {
          titulo: 'La muerte de Héctor, el ruego de Príamo y las honras fúnebres (Cantos XXII - XXIV)',
          detalle: 'Héctor aguarda en soledad frente a las murallas de Troya; al ver la figura resplandeciente de Aquiles, el terror se apodera de él y huye dando tres vueltas alrededor de la ciudadela. La diosa Atenea lo engaña tomando la figura de su hermano Deífobo para animarlo a pelear. En el duelo final, Aquiles atraviesa la garganta de Héctor con su lanza de fresno. Desoyendo los ruegos moribundos del príncipe para que entregue su cadáver a sus padres, Aquiles ata los tobillos de Héctor a su carro y arrastra el cuerpo en el polvo frente a los ojos horrorizados de Príamo y Andrómaca. Durante días profana el cadáver tras celebrar los funerales de Patroclo. Finalmente, el anciano rey Príamo se introduce de noche en la tienda de Aquiles guiado por Hermes, besa las manos que mataron a tantos hijos suyos e implora compasión; Aquiles rompe a llorar recordando a su propio padre Peleo, accede a devolver el cadáver de Héctor y concede una tregua de doce días para los solemnes funerales del héroe troyano.'
        }
      ],
      personajes: [
        { nombre: 'Aquiles', rol: 'Héroe supremo aqueo ("El de los pies ligeros")', descripcion: 'Hijo de la diosa Tetis y el mortal Peleo, personificación de la fuerza heroica insuperable y la cólera indómita.' },
        { nombre: 'Héctor', rol: 'Príncipe defensor de Troya ("El de tremolante casco")', descripcion: 'Primogénito de Príamo, héroe moral que combate por amor a su patria, a su esposa Andrómaca y a su hijo Astianacte.' },
        { nombre: 'Agamenón', rol: 'Comandante en jefe de los griegos', descripcion: 'Rey de Micenas, soberbio y ambicioso, cuya arrogancia desata la discordia en las filas aqueas.' },
        { nombre: 'Patroclo', rol: 'Amigo entrañable de Aquiles', descripcion: 'Guerrero compasivo y noble cuya muerte sacrificada precipita el desenlace trágico de la guerra.' },
        { nombre: 'Príamo', rol: 'Rey anciano de Troya', descripcion: 'Monarca venerable que conmueve a Aquiles arrodillándose para besar las manos del homicida de sus hijos.' },
        { nombre: 'Helena', rol: 'Causa del conflicto', descripcion: 'Esposa de Menelao seducida por Paris, consciente de la desgracia que su belleza acarrea sobre ambos pueblos.' }
      ],
      temasClave: [
        { titulo: 'La cólera heroica (Menis)', explicacion: 'La ira desmesurada como fuerza destructiva que quiebra la solidaridad de los hombres y provoca ruina y muerte.' },
        { titulo: 'El destino inexorable (Moira) y la gloria eterna (Kleos)', explicacion: 'Aquiles elige conscientemente una vida corta pero inmortalizada por la gloria bélica frente a una larga vejez sin renombre.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Monumento fundacional de la literatura occidental. Narra los cincuenta y un días finales del noveno año del asedio de Troya, articulados alrededor de la cólera de Aquiles, la muerte de su compañero Patroclo y la inmolación del noble príncipe troyano Héctor.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Épico — Epopeya' },
        { clave: 'Autor atribuido', valor: 'Homero (Poeta ciego jónico)' },
        { clave: 'Estructura formal', valor: '24 cantos o rapsodias en hexámetros dactílicos' },
        { clave: 'Lapso temporal abarcado', valor: 'Aproximadamente 51 días del último año de la Guerra de Troya' },
        { clave: 'Epíteto más célebre', valor: 'Aquiles, "el de los pies ligeros"; Héctor, "el de tremolante casco"' }
      ],
      elementosClave: [
        { titulo: 'Lo que no narra La Ilíada', contenido: 'No incluye el juicio de Paris, ni el rapto inicial de Helena, ni el caballo de madera, ni la caída final de Troya (relatada en la Odisea y la Eneida).' },
        { titulo: 'El escudo de Aquiles', contenido: 'Écfrasis maestra: descripción poética de la forja divina donde se plasma la paz, la guerra, la agricultura y el orden cósmico.' },
        { titulo: 'La reconciliación de la compasión', contenido: 'El llanto compartido entre Príamo y Aquiles demuestra que el dolor une a los enemigos por encima de la gloria militar.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Cuál es el acontecimiento que inicia y detona el conflicto en la obra?',
          respuesta: 'La afrenta cometida por Agamenón al arrebatar a Briseida de la tienda de Aquiles, tras ser obligado a devolver a Criseida al sacerdote de Apolo.'
        },
        {
          pregunta: '¿Cómo concluye formalmente La Ilíada?',
          respuesta: 'Con los funerales solemnes y la quema en la pira del cadáver de Héctor en las murallas de Troya, tras la tregua pactada entre Príamo y Aquiles.'
        }
      ]
    }
  },
  {
    id: 'don-quijote-de-la-mancha',
    titulo: 'Don Quijote de la Mancha',
    autor: 'Miguel de Cervantes Saavedra',
    año: '1605 (Parte I) / 1615 (Parte II)',
    pais: 'España',
    genero: 'Narrativo',
    especie: 'Novela moderna polifónica',
    corriente: 'Siglo de Oro Español (Renacimiento y Barroco)',
    temaPrincipal: 'El choque entre el idealismo heroico y la cruda realidad material, y la dialéctica entre la locura noble y la cordura pragmática.',
    portadaGradiente: 'linear-gradient(145deg, #854d0e 0%, #a16207 50%, #3f2c06 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Alonso Quijano, un hidalgo cincuentón empobrecido de La Mancha, pierde el juicio por la lectura voraz de libros de caballerías y decide armarse caballero andante bajo el nombre de Don Quijote para socorrer a los desvalidos y alcanzar la fama. Acompañado de su fiel escudero Sancho Panza, emprende disparatadas aventuras donde confunde ventas con castillos, molinos con gigantes y rebaños con ejércitos. Tras ser burlado por nobles en la corte ducal y vencido finalmente por el bachiller Sansón Carrasco disfrazado del Caballero de la Blanca Luna, regresa a su aldea, recupera la lucidez y muere rodeado del afecto de los suyos.',
      contextoHistorico: 'Publicada en dos entregas: 1605 (El ingenioso hidalgo) y 1615 (El ingenioso caballero), esta última motivada por la aparición del apócrifo de Avellaneda. Inaugura la novela moderna mediante el perspectivismo, la metaliteratura y el diálogo continuo entre personajes.',
      analisisTrama: [
        {
          titulo: 'La locura caballeresca y la primera salida solitaria (Parte I, Capítulos 1 - 6)',
          detalle: 'En un lugar de la Mancha de cuyo nombre no quiero acordarme, vive Alonso Quijano, aficionado a las novelas de caballería hasta secársele el cerebro. Limpia unas viejas armas oxidadas de sus bisabuelos, bautiza a su rocín flaco con el nombre de Rocinante, adopta para sí el título de Don Quijote de la Mancha y elige como señora ideal a la campesina Aldonza Lorenzo llamándola Dulcinea del Toboso. En su primera salida solitaria llega a una humilde venta que toma por castillo; allí obliga al ventero a armarlo caballero en una ceremonia bufa velando sus armas en el corral. Tras defender torpemente al pastorcillo Andrés golpeado por su amo Juan Haldudo, es apaleado por unos mercaderes toledanos y devuelto a su casa malherido por un vecino. Sus amigos el cura y el barbero queman gran parte de su biblioteca en el famoso escrutinio.'
        },
        {
          titulo: 'La segunda salida con Sancho Panza y los molinos de viento (Parte I, Capítulos 7 - 15)',
          detalle: 'Don Quijote convence a su vecino labrador Sancho Panza para que sea su escudero prometiéndole el gobierno de una ínsula. Se produce el célebre combate contra los molinos de viento en el campo de Montiel, a los que el caballero toma por descomunales gigantes del hechicero Frestón; al embestir a uno, un aspa despedaza su lanza y lo arroja violentamente por el suelo. Luego atacan a unos frailes de San Benito y vence al vizcaíno en un combate a espada. Más adelante, los yangüeses muelen a palos a Rocinante y a los dos protagonistas.'
        },
        {
          titulo: 'La penitencia en Sierra Morena y el retorno enjaulado (Parte I, Capítulos 25 - 52)',
          detalle: 'En Sierra Morena, imitando a Amadís de Gaula, Don Quijote realiza una penitencia de amor dando volteretas y escribiendo una carta a Dulcinea que encomienda a Sancho. Sancho se encuentra con el cura y el barbero, quienes idean una estratagema con la joven Dorotea (disfrazada de la princesa Micomicona) para convencer al caballero de regresar a su aldea a desfacer un agravio. Tras el episodio de la lucha con los cueros de vino en la venta y los relatos intercalados (El curioso impertinente), Don Quijote es encerrado en una jaula de madera bajo el engaño de que está encantado y es trasladado en una carreta de bueyes de vuelta a su hogar.'
        },
        {
          titulo: 'La tercera salida: la falsificación de Dulcinea y la Cueva de Montesinos (Parte II, Capítulos 1 - 29)',
          detalle: 'En la Segunda Parte de 1615, Don Quijote y Sancho se enteran por el bachiller Sansón Carrasco de que sus andanzas ya han sido publicadas en un libro impreso. Emprenden la tercera salida rumbo al Toboso. Sancho, incapaz de hallar el palacio de Dulcinea, engaña a su amo haciéndole creer que una tosca campesina montada en un asno es la princesa encantada. Más adelante, Don Quijote desciende atado a una soga a las profundidades de la Cueva de Montesinos, donde sufre un éxtasis onírico de visiones alegóricas sobre el tiempo y la verdad.'
        },
        {
          titulo: 'Las burlas en el palacio ducal y el gobierno sabio de la ínsula Barataria (Parte II, Capítulos 30 - 53)',
          detalle: 'Unos duques ociosos leen la primera parte de la novela y reciben a Don Quijote y a Sancho en su castillo para burlarse de ellos organizando complejas farsas teatrales (el vuelo sobre el caballo de madera Clavileño). Los duques nombran a Sancho gobernador de la supuesta ínsula Barataria; lejos de fracasar, el escudero demuestra una prudencia, agudeza y sentido de justicia asombrosos resolviendo pleitos populares con sabiduría salomónica. No obstante, asustado por una fingida invasión militar y las privaciones del protocolo, Sancho renuncia con dignidad proclamando que prefiere la libertad de su jumento.'
        },
        {
          titulo: 'La derrota ante la Blanca Luna y la muerte lúcida de Alonso Quijano (Parte II, Capítulos 64 - 74)',
          detalle: 'En las playas de Barcelona, Don Quijote es desafiado por el Caballero de la Blanca Luna (el bachiller Sansón Carrasco disfrazado). Derrotado en el combate de lanzas, el caballero es obligado a deponer las armas y retirarse a su aldea durante un año. Hundido en una profunda melancolía, regresa a su hogar donde cae postrado por unas fiebres. En su lecho de muerte, recupera plenamente la cordura, maldice los libros de caballerías y proclama: "Ya no soy Don Quijote de la Mancha, sino Alonso Quijano, a quien mis costumbres dieron renombre de el Bueno". Mientras Sancho llora amargamente rogándole que no muera y que salgan al campo vestidos de pastores, el hidalgo hace testamento, recibe los sacramentos y muere en serena paz cristiana.'
        }
      ],
      personajes: [
        { nombre: 'Don Quijote de la Mancha (Alonso Quijano)', rol: 'Protagonista idealista', descripcion: 'Hidalgo justiciero y desinteresado cuya locura estética persigue defender la virtud, la verdad y el auxilio al indefenso.' },
        { nombre: 'Sancho Panza', rol: 'Escudero pragmático', descripcion: 'Labrador bonachón y glotón, repleto de refranes populares, que experimenta el proceso de quijotización hasta amar el ideal de la aventura.' },
        { nombre: 'Dulcinea del Toboso (Aldonza Lorenzo)', rol: 'Dama idealizada', descripcion: 'Campesina ruda de siembra que en la imaginación poética del caballero encarna la suma de todas las virtudes y la belleza terrena.' },
        { nombre: 'Sansón Carrasco', rol: 'Bachiller de Salamanca', descripcion: 'Joven socarrón que mediante diversos disfraces (Caballero de los Espejos, Caballero de la Blanca Luna) logra vencer a Don Quijote para obligarlo a curar su locura en casa.' },
        { nombre: 'Rocinante', rol: 'Caballo del héroe', descripcion: 'Rocín huesudo y leal que comparte con estoicismo las caídas, pedradas y miserias de su amo.' }
      ],
      temasClave: [
        { titulo: 'La Quijotización de Sancho y la Sanchificación de Don Quijote', explicacion: 'La mutua influencia dialéctica: el escudero pragmático aprende a soñar con ideales nobles, mientras el caballero alucinado asimila la crudeza terrenal.' },
        { titulo: 'La libertad como el bien más preciado', explicacion: '"La libertad, Sancho, es uno de los más preciosos dones que a los hombres dieron los cielos...": proclama de la autonomía moral del individuo.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la novela universal y obra cumbre del idioma castellano. Parodia las novelas de caballería a través de las aventuras de Don Quijote y Sancho Panza, explorando la tensión humana irreductible entre el idealismo utópico y la realidad mundana.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela polifónica moderna' },
        { clave: 'Autor', valor: 'Miguel de Cervantes Saavedra ("El Manco de Lepanto")' },
        { clave: 'Fechas de publicación', valor: 'Primera parte (1605) / Segunda parte (1615)' },
        { clave: 'Estructura general', valor: 'Parte I (52 capítulos, 2 salidas) / Parte II (74 capítulos, 1 salida)' },
        { clave: 'Propósito inicial declarado', valor: 'Derribar la máquina mal fundada de los libros de caballerías' }
      ],
      elementosClave: [
        { titulo: 'Metaliteratura y autoconciencia', contenido: 'En la Segunda Parte, los personajes han leído la Primera Parte y conocen su propia fama literaria, hablando de sí mismos como figuras de imprenta.' },
        { titulo: 'La ínsula Barataria', contenido: 'Sancho demuestra que el buen gobierno no depende del linaje aristocrático sino del sentido común, la honestidad y la piedad.' },
        { titulo: 'La muerte del héroe', contenido: 'Recupera el juicio antes de expirar: la desaparición de la locura poética marca paradójicamente el fin de su energía vital.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Quién logra vencer definitivamente a Don Quijote y obligarlo a regresar a su casa?',
          respuesta: 'El bachiller Sansón Carrasco bajo la armadura del Caballero de la Blanca Luna en las playas de Barcelona.'
        },
        {
          pregunta: '¿Por qué la obra de Cervantes es considerada la primera novela moderna?',
          respuesta: 'Porque sus personajes no son tipos estáticos arquetípicos, sino seres complejos que evolucionan psicológicamente, dialogan entre sí y modifican su visión del mundo a lo largo de la narración.'
        }
      ]
    }
  },
  {
    id: 'la-vida-es-sueno',
    titulo: 'La vida es sueño',
    autor: 'Pedro Calderón de la Barca',
    año: '1635',
    pais: 'España',
    genero: 'Dramático',
    especie: 'Drama filosófico en verso',
    corriente: 'Siglo de Oro Español (Barroco)',
    temaPrincipal: 'El libre albedrío frente al determinismo astral, la naturaleza ilusoria de la existencia terrena y el dominio de las pasiones.',
    portadaGradiente: 'linear-gradient(145deg, #312e81 0%, #4338ca 50%, #1e1b4b 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'El rey Basilio de Polonia encierra a su hijo recién nacido Segismundo en una torre oculta entre riscos, aterrado por vaticinios astrológicos que predecían que el príncipe sería un tirano sanguinario que humillaría su corona. Años después, arrepentido, decide narcotizarlo y trasladarlo a palacio para poner a prueba su comportamiento en libertad. El príncipe reacciona con cólera salvaje y es devuelto a sus cadenas haciéndole creer que todo fue un sueño. Cuando el pueblo se levanta en armas y lo libera para evitar la usurpación extranjera, Segismundo domina sus impulsos bárbaros, perdona a su padre y consagra la victoria del libre albedrío sobre el destino.',
      contextoHistorico: 'Representada en 1635 en Madrid. Sintetiza las grandes polémicas teológicas de la Contrarreforma católica (la disputa entre la gracia divina, el libre albedrío y la predestinación) y la cosmovisión barroca sobre el desengaño del mundo.',
      analisisTrama: [
        {
          titulo: 'El descubrimiento de la torre y el lamento de la libertad (Jornada Primera)',
          detalle: 'Rosaura, vestida de hombre y acompañada de su criado gracioso Clarín, llega a una abrupta cordillera en Polonia buscando vengar su honra ultrajada por el duque Astolfo. Escuchan un desgarrador lamento y descubren una torre lúgubre donde yace encadenado un hombre vestido con pieles de fieras: es Segismundo. El príncipe pronuncia su inmortal soliloquio ("¡Ay mísero de mí, ay infelice!"), comparando su cautiverio con la libertad del ave, el pez y el arroyo, preguntándose cuál fue el delito de haber nacido. Clotaldo, carcelero del príncipe y guardián del secreto real, los captura bajo amenaza de muerte.'
        },
        {
          titulo: 'La confesión del rey Basilio y el experimento de palacio (Jornada Primera - final)',
          detalle: 'En la corte real, el rey Basilio reúne a la nobleza y a los pretendientes al trono (Astolfo y Estrella). El monarca confiesa la verdad de Estado: Segismundo es su legítimo heredero, encerrado desde la cuna porque los astros anunciaron que derrocaría a su padre y destrozaría el reino. No obstante, dudando de si fue injusto anular el libre albedrío de su hijo, Basilio anuncia su plan: narcotizarán al príncipe con una pócima y lo despertarán en la cama real; si se muestra justo y comedido, reinará; si se muestra salvaje y despótico, lo devolverán a la torre convenciéndolo de que todo lo vivido fue una ilusión onírica.'
        },
        {
          titulo: 'El despertar en palacio y el estallido de la fiera (Jornada Segunda)',
          detalle: 'Segismundo despierta en palacio ataviado con ropas de seda y rodeado de criados que le rinden pleitesía. Clotaldo le confiesa su identidad real y el cautiverio al que fue sometido. Lleno de rabia ante semejante despojo vital, Segismundo estalla en cólera desmedida: arroja a un criado por la ventana al mar por contradecirlo, intenta matar a Clotaldo con una daga e insulta abiertamente a su padre Basilio acusándolo de tirano desnaturalizado que le quitó la humanidad. Convencido de que el oráculo fue exacto, Basilio ordena volver a dormirlo con narcóticos y regresarlo a la torre.'
        },
        {
          titulo: 'El regreso a las cadenas y el soliloquio de la ilusión (Jornada Segunda - final)',
          detalle: 'Segismundo despierta encadenado de nuevo a las peñas con sus viejas pieles. Clotaldo le sugiere con astucia que su estancia en el palacio fue solo un sueño fruto de su mente febril, agregando una lección moral: aun en sueños no se debe descuidar el obrar con rectitud porque el bien nunca se pierde. Quedando a solas, Segismundo pronuncia su célebre monólogo ("¿Qué es la vida? Un frenesí..."): concluye que el poder, la gloria y las miserias de este mundo son sombras pasajeras, y que toda la existencia terrena es un sueño del que solo se despierta con la muerte.'
        },
        {
          titulo: 'La insurrección del pueblo y el ejército de los rebeldes (Jornada Tercera)',
          detalle: 'Al enterarse de que el rey Basilio planea heredar la corona al duque extranjero Astolfo de Moscovia, el pueblo llano y el ejército de Polonia se amotinan y asaltan la torre para rescatar a su legítimo príncipe natural. Segismundo, alertado por su experiencia previa, duda al principio creyendo que se trata de otra vana quimera onírica, pero decide asumir el mando de las tropas rebeldes guiado por una nueva máxima ética: "Aun en sueños conviene obrar bien". Rosaura se une a su hueste pidiéndole que restaure su honor de doncella.'
        },
        {
          titulo: 'La batalla final, el perdón de Segismundo y el triunfo del libre albedrío (Jornada Tercera - final)',
          detalle: 'Las tropas de Segismundo aplastan al ejército de Basilio en una sangrienta batalla donde muere el criado Clarín por intentar eludir el combate. El rey Basilio, viéndose derrotado y esperando la muerte, se arroja humildemente a los pies de su hijo cumpliendo aparentemente la profecía. Sin embargo, Segismundo sorprende a todos levantando con nobleza a su anciano progenitor, abrazándolo y rindiéndole vasallaje: declara que el destino puede inclinar al hombre al mal, pero la virtud, la prudencia y el libre albedrío pueden vencerlo siempre. Segismundo casa a Rosaura con Astolfo para lavar su honra y él acepta por esposa a la infanta Estrella, asumiendo el trono como un monarca sabio y justiciero.'
        }
      ],
      personajes: [
        { nombre: 'Segismundo', rol: 'Príncipe protagonista', descripcion: 'Pasa de ser una fiera indómita dominada por los rencores del encierro a un gobernante prudente que vence sus pasiones por el libre albedrío.' },
        { nombre: 'Rey Basilio', rol: 'Monarca astrólogo', descripcion: 'Científico y sabio en las estrellas pero ciego en la paternidad, comete el error de condenar a priori a su hijo por miedo al oráculo.' },
        { nombre: 'Rosaura', rol: 'Dama agraviada', descripcion: 'Joven valerosa que viaja a Polonia para exigir reparación de honor a Astolfo, hilo conductor de la trama secundaria.' },
        { nombre: 'Clotaldo', rol: 'Ayo y carcelero leal', descripcion: 'Fiel servidor del rey y padre secreto de Rosaura, mediador severo pero compasivo entre la torre y la corte.' },
        { nombre: 'Clarín', rol: 'Personaje gracioso', descripcion: 'Criado bufón y cobarde cuya muerte accidental demuestra la imposibilidad de esconderse del destino.' }
      ],
      temasClave: [
        { titulo: 'El libre albedrío contra el hado', explicacion: 'Las estrellas inflinan pero no fuerzan la voluntad humana; el autodominio moral y la virtud tienen la capacidad de quebrar el determinismo.' },
        { titulo: 'La vida como ilusión onírica (Desengaño barroco)', explicacion: 'La fugacidad de los placeres mundanos: el poder político es un préstamo temporal que debe ejercerse con rectitud ante la eternidad.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Obra cumbre del teatro barroco filosófico español. Escenifica el encierro del príncipe Segismundo por los temores oraculares de su padre Basilio, su violenta prueba en palacio y su redención moral final gracias al ejercicio del libre albedrío.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Drama filosófico en verso' },
        { clave: 'Autor', valor: 'Pedro Calderón de la Barca (Madrid)' },
        { clave: 'Estructura', valor: 'Tres jornadas (actos) en versos de arte menor y mayor (romances, silvas, décimas)' },
        { clave: 'Monólogo más célebre', valor: '"Yo sueño que estoy aquí destas prisiones cargado..." (Jornada II)' },
        { clave: 'Subtrama paralela', valor: 'La reparación del honor de Rosaura frente al duque Astolfo' }
      ],
      elementosClave: [
        { titulo: 'El delito de nacer', contenido: '"Pues el delito mayor del hombre es haber nacido": influencia de la teología del pecado original y la condición caída del ser humano.' },
        { titulo: 'La muerte de Clarín', contenido: 'Moraleja fatalista: quien se oculta para no arriesgar su vida en la batalla recibe el impacto mortal de una bala perdida.' },
        { titulo: 'Castigo al soldado rebelde', contenido: 'Segismundo premia la fidelidad y condena a perpetuidad al soldado que traicionó al rey para levantarlo a él en armas.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué el rey Basilio decidió encerrar a Segismundo al nacer?',
          respuesta: 'Porque al nacer el niño murió su madre Clorilene y los astros auguraron que sería un monstruo sanguinario que pisotearía las canas de su padre y dividiría a Polonia.'
        },
        {
          pregunta: '¿Qué convicción moral transforma la conducta de Segismundo en la tercera jornada?',
          respuesta: 'La certeza de que la vida terrenal es un sueño efímero y que, sea despierto o soñando, lo único verdaderamente valioso e imperecedero es obrar el bien.'
        }
      ]
    }
  },
  {
    id: 'hamlet',
    titulo: 'Hamlet',
    autor: 'William Shakespeare',
    año: '1601',
    pais: 'Inglaterra',
    genero: 'Dramático',
    especie: 'Tragedia',
    corriente: 'Renacimiento Inglés (Teatro Isabelino)',
    temaPrincipal: 'La duda existencial, la parálisis provocada por la excesiva reflexión moral y la podredumbre del poder político ante el fratricidio.',
    portadaGradiente: 'linear-gradient(145deg, #09090b 0%, #18181b 50%, #27272a 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'En el castillo real de Elsinor, en Dinamarca, el príncipe Hamlet es consumido por la pena tras la repentina muerte de su padre y las apresuradas nupcias de su madre, la reina Gertrudis, con su tío Claudio. La aparición del fantasma del difunto monarca le revela que Claudio lo asesinó vertiéndole veneno en el oído mientras dormía y le exige venganza. Hamlet finge locura para investigar el crimen y desenmascarar al usurpador a través de una compañía de teatro itinerante. Sin embargo, su dilema ético y su parálisis reflexiva desencadenan una sangrienta cadena de tragedias que siegan las vidas de Polonio, Ofelia, Gertrudis, Laertes, Claudio y la del propio príncipe.',
      contextoHistorico: 'Representada en Londres hacia 1601. Obra cumbre de la dramaturgia occidental que profundiza en la crisis del humanismo renacentista frente a la decadencia de las instituciones morales y políticas.',
      analisisTrama: [
        {
          titulo: 'El espectro en las almenas y la revelación del fratricidio (Acto I)',
          detalle: 'En las frías plataformas del castillo de Elsinor, los centinelas Marcelo y Bernardo presencian junto a Horacio la aparición del espectro del difunto rey de Dinamarca con armadura de combate. Convocado por su leal amigo Horacio, el príncipe Hamlet acude al filo de la medianoche. El fantasma aparta al príncipe y le revela la verdad oculta: no murió por la mordedura de una serpiente como se dijo al pueblo, sino que su hermano Claudio le vertió un veneno letal (beleño) en el oído mientras dormía en el jardín para usurparle la corona y a su esposa Gertrudis. El espectro exige vengar el crimen pero le ordena no dañar a su madre.'
        },
        {
          titulo: 'La fingida demencia y el espionaje de Polonio (Acto II)',
          detalle: 'Hamlet impone juramento de silencio a sus camaradas y decide fingir un comportamiento desquiciado ("antic disposition") para observar libremente los movimientos de la corte sin despertar sospechas directas. El intrigante chambelán Polonio asume que la locura del príncipe se debe al rechazo amoroso de su hija Ofelia, a quien Hamlet había enviado apasionadas misivas. Claudio y Gertrudis, desconfiados de los motivos reales del príncipe, contratan a Rosencrantz y Guildenstern, antiguos compañeros de escuela de Hamlet, para que lo espíen e informen de sus pensamientos.'
        },
        {
          titulo: 'El soliloquio existencial, el rechazo a Ofelia y La Ratonera (Acto III)',
          detalle: 'Mientras aguarda la oportunidad de verificar la palabra del espectro, Hamlet deambula por el palacio pronunciando su célebre monólogo ("Ser o no ser, esa es la cuestión..."), cavilando si es más digno sufrir las calamidades de la vida o ponerles fin combatiéndolas, concluyendo que el temor al más allá y al sueño de la muerte paraliza las resoluciones humanas. Al encontrarse con Ofelia, la rechaza con dureza ("¡Vete a un convento! ¿Para qué engendrar más pecadores?"). Esa noche, Hamlet aprovecha la llegada de unos comediantes itinerantes y monta una obra teatral titulada El asesinato de Gonzago (a la que apoda "La Ratonera"), cuya trama reproduce exactamente el homicidio de su padre; al presenciar la escena del veneno vertido en el oído, el rey Claudio palidece, interrumpe la función y huye despavorido, confirmando su culpabilidad ante los ojos de Hamlet y Horacio.'
        },
        {
          titulo: 'El asesinato accidental de Polonio y el destierro a Inglaterra (Acto III - final y Acto IV)',
          detalle: 'Gertrudis cita a Hamlet en sus aposentos para reprenderlo por su conducta. La discusión se torna violenta y el príncipe le reprocha con crudeza su boda incestuosa con el asesino de su padre. Al escuchar un movimiento detrás del tapiz de la habitación, Hamlet cree que es Claudio espiando, desenvaina su espada y atraviesa las cortinas matando en el acto al indiscreto Polonio. Claudio aprovecha el homicidio para desterrar de inmediato a Hamlet a Inglaterra escoltado por Rosencrantz y Guildenstern, con una carta secreta dirigida al rey inglés ordenando decapitar al príncipe al llegar a sus costas. Sin embargo, Hamlet descubre el complot pirata en altamar, sustituye la misiva para que los ejecutados sean sus falsos amigos y regresa en secreto a Dinamarca.'
        },
        {
          titulo: 'La locura de Ofelia y el complot del duelo envenenado (Acto IV - final)',
          detalle: 'El asesinato de su padre a manos del hombre que amaba trastorna por completo a Ofelia, quien deambula desquiciada por el palacio repartiendo flores y cantando coplas melancólicas. Poco después, la joven muere ahogada en un arroyo al caer de un sauce mientras intentaba colgar guirnaldas silvestres. Su hermano Laertes regresa furioso de Francia exigiendo venganza. El rey Claudio manipula con frialdad el rencor de Laertes y urde una trampa mortal: un duelo de esgrima amistoso para celebrar la reconciliación entre Laertes y Hamlet, donde la espada de Laertes carecerá de botón protector y estará untada con un veneno letal; como precaución adicional, Claudio dispondrá una copa de vino envenenado para brindarle al príncipe durante la contienda.'
        },
        {
          titulo: 'La escena de los sepultureros y la hecatombe final en Elsinor (Acto V)',
          detalle: 'Hamlet regresa a Dinamarca y camina con Horacio por el cementerio de Elsinor, donde dos sepultureros cavan cantando. Hamlet contempla la calavera del bufón de su infancia, Yorick, reflexionando con ironía melancólica sobre la putrefacción democrática que iguala a mendigos y emperadores como Alejandro Magno en el polvo. El cortejo fúnebre de Ofelia interrumpe la escena; Hamlet y Laertes se arrojan a la fosa forcejeando por el dolor. Se celebra finalmente el duelo palaciego ante la corte: en el fragor del asalto, la reina Gertrudis bebe inadvertidamente de la copa envenenada y cae muerta; Laertes hiere a Hamlet con la punta envenenada, pero en el forcejeo se intercambian las espadas y Hamlet atraviesa a Laertes con su propia arma ponzoñosa. En su agonía, Laertes confiesa el complot del rey. Furioso, Hamlet hiere a Claudio con el florete emponzoñado y le obliga a tragar los restos del vino letal, ejecutando su tardía venganza. Antes de morir en brazos de Horacio, Hamlet impide que éste se suicide, encomienda el reino al príncipe Fortinbrás de Noruega y pronuncia sus últimas palabras: "El resto es silencio".'
        }
      ],
      personajes: [
        { nombre: 'Hamlet', rol: 'Príncipe de Dinamarca', descripcion: 'Intelectual melancólico y reflexivo cuya excesiva conciencia moral lo sumerge en la indecisión frente a la orden de matar.' },
        { nombre: 'Rey Claudio', rol: 'Antagonista fratricida', descripcion: 'Hermano del difunto monarca, usurpador astuto, cínico y calculador que corrompe la corte para blindar su poder.' },
        { nombre: 'Reina Gertrudis', rol: 'Madre de Hamlet', descripcion: 'Mujer débil y sensual cuyas precipitadas nupcias con su cuñado precipitan la aversión moral de su hijo.' },
        { nombre: 'Ofelia', rol: 'Víctima inocente', descripcion: 'Hija de Polonio, joven pura manipulada por su familia y destrozada por el rechazo de Hamlet, cayendo en la locura y el suicidio.' },
        { nombre: 'Laertes', rol: 'Hombre de acción impulsivo', descripcion: 'Hermano de Ofelia, antítesis de Hamlet: no reflexiona ni duda al buscar venganza por la muerte de su linaje.' },
        { nombre: 'Horacio', rol: 'Amigo leal y filósofo', descripcion: 'Único confidente desinteresado que sobrevive a la tragedia para narrar con fidelidad la historia del príncipe.' }
      ],
      temasClave: [
        { titulo: 'La parálisis del pensamiento sobre la acción', explicacion: 'La profunda capacidad analítica de Hamlet desgasta su impulso resolutivo: "La conciencia nos vuelve a todos cobardes...".' },
        { titulo: 'La podredumbre moral del Estado', explicacion: '"Algo está podrido en el estado de Dinamarca": el crimen ilegítimo en la cúpula contamina todas las relaciones humanas del reino.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la tragedia shakesperiana. Explora el tormento interior del príncipe Hamlet ante la revelación espectral del asesinato de su padre a manos de su tío Claudio, culminando en la masacre generalizada de la corte de Elsinor por la dilación de la venganza.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Tragedia de venganza (Revenge Tragedy)' },
        { clave: 'Autor', valor: 'William Shakespeare (Stratford-upon-Avon)' },
        { clave: 'Estructura formal', valor: 'Cinco actos en verso blanco (pentámetro yámbico) y prosa' },
        { clave: 'Frase más universal', valor: '"Ser o no ser, esa es la cuestión" (Acto III, escena 1)' },
        { clave: 'Espacio único de la acción', valor: 'Castillo de Elsinor (Dinamarca)' }
      ],
      elementosClave: [
        { titulo: 'El recurso del teatro dentro del teatro', contenido: 'La Ratonera: Hamlet utiliza el arte dramático como espejo psicológico para desenmascarar la conciencia criminal del rey.' },
        { titulo: 'La calavera de Yorick', contenido: 'Símbolo del Vanitas barroco: la muerte corroe toda jerarquía mundana convirtiendo la gracia en carroña.' },
        { titulo: 'Últimas palabras de Hamlet', contenido: '"El resto es silencio": aceptación serena del cese del dolor mental y el descanso eterno.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Cómo fue asesinado exactamente el rey padre de Hamlet?',
          respuesta: 'Su hermano Claudio vertió extracto de beleño (hebona) en su oído mientras dormía plácidamente en el jardín del palacio.'
        },
        {
          pregunta: '¿Por qué Hamlet no asesina a Claudio cuando lo encuentra rezando en la capilla?',
          respuesta: 'Porque teme que si lo mata mientras reza su alma vaya directamente al cielo perdonada, prefiriendo aguardar a que peque para enviarlo a los tormentos del infierno.'
        }
      ]
    }
  },
  {
    id: 'tradiciones-peruanas',
    titulo: 'Tradiciones Peruanas',
    autor: 'Ricardo Palma',
    año: '1872 - 1910',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Tradición (especie híbrida palmista)',
    corriente: 'Romanticismo Peruano',
    temaPrincipal: 'La recreación risueña, satírica y amena de la historia, las costumbres populares y los refranes del Perú desde el virreinato hasta los inicios republicanos.',
    portadaGradiente: 'linear-gradient(145deg, #78350f 0%, #b45309 50%, #451a03 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'Las Tradiciones Peruanas constituyen un vasto conjunto de relatos históricos y anecdóticos donde Ricardo Palma fusiona de forma magistral la crónica virreinal, el cuadro de costumbres y la ironía criolla. Con un lenguaje colmado de modismos limeños, humor picante y elegancia castiza, el autor desmitifica a virreyes, monjas, obispos y libertadores, explicando con gracia el origen histórico o legendario de dichos y refranes populares del pueblo peruano.',
      contextoHistorico: 'Publicadas a lo largo de varias décadas en series sucesivas por el "Bibliotecario Mendigo". Palma reconstruyó la memoria colectiva e identidad histórica del Perú devastado por la Guerra del Pacífico mediante el rescate del archivo virreinal.',
      analisisTrama: [
        {
          titulo: 'La anatomía de la Tradición Palmista y el estilo criollo',
          detalle: 'Palma inventa un subgénero propio caracterizado por una estructura tripartita canónica: 1) La introducción histórica o digresión erudita donde se sitúa la época y los mandatos virreinales; 2) El nudo anecdótico o relato costumbrista que escenifica el drama o enredo de los personajes; y 3) La moraleja, epigrama o explicación festiva del dicho popular que cierra la narración con agudeza.'
        },
        {
          titulo: '"Al rincón! ¡Quita calzón!" (Época virreinal / Arequipa)',
          detalle: 'En el convento de San Jerónimo en Arequipa, el severo obispo Chávez de la Rosa interroga a los seminaristas sobre la gramática latina. Ante cada respuesta fallida, envía al alumno al rincón de los azotes con la orden: "¡Al rincón! ¡Quita calzón!". El más pequeño de los estudiantes (el niño Francisco Javier de Luna Pizarro) se ríe de la situación; el obispo lo llama al frente para humillarlo con preguntas intrincadas, pero el niño responde a todo con solvencia. Desafiante, el infante pregunta al prelado: "¿Sabe su señoría cuántas veces se dice Dominus vobiscum en la misa?". El obispo titubea y no acierta; el niño exclama: "¡Al rincón! ¡Quita calzón!". Admirado por su valentía e inteligencia, el obispo anula los castigos corporales y se convierte en el protector del infante, quien andando los años sería presidente del primer Congreso Constituyente del Perú.'
        },
        {
          titulo: '"Los incas ajedrecistas" (Época de la Conquista / Cajamarca)',
          detalle: 'Durante los meses de cautiverio en Cajamarca previos a su ejecución, el inca Atahualpa observa en silencio las partidas de ajedrez que disputan los capitanes españoles Hernando de Soto y Riquelme el tesorero. En una reñida partida, Riquelme está a punto de ganar cuando Atahualpa interviene discretamente aconsejando a Hernando de Soto: "¡No, capitán! ¡El caballo!". Siguiendo la indicación del inca, Soto da jaque mate a Riquelme. El despechado tesorero guardó un rencor mortal hacia el monarca indígena, siendo semanas después uno de los jueces que votaron despiadadamente a favor de la sentencia de muerte por garrote vil contra Atahualpa.'
        },
        {
          titulo: '"Don Dimas de la Tijereta" (El pacto con el Diablo burlado)',
          detalle: 'Don Dimas de la Tijereta, un escribano de número limeño viejo y avaro ("con más arrugas que una pasa y más mañas que una zorra"), se enamora perdidamente de la joven y coqueta Cholita. Al verse rechazado por su vejez, invoca a Satanás en el cerro San Cristóbal y firma un pacto con el diablo Lilith: a cambio de tres años de amor correspondido de la muchacha, Dimas entregará al demonio "su almilla" al término del plazo. Cumplido el tiempo, Lilith acude a cobrar el alma; sin embargo, el astuto escribano se quita su camisa interior de bayeta y se la entrega. Ante la furia del diablo, Dimas argumenta jurídicamente que en el diccionario de la Real Academia la palabra "almilla" significa prenda interior de vestir y no el alma espiritual. El caso es llevado a juicio ante el Tribunal del Infierno presidido por Satanás, quien dictamina a favor de la trampa del escribano declarando que ni en el averno pueden violar las leyes de la semántica.'
        },
        {
          titulo: '"La camisa de Margarita" (La dote y el orgullo limeño)',
          detalle: 'Margarita Pareja, la joven más codiciada de Lima e hija del orgulloso caballero don Raimundo Pareja, se enamora del hidalgo don Luis Alcázar, muchacho noble pero sumido en la extrema pobreza. Don Raimundo rechaza la boda diciendo con desprecio que no consentirá que su hija se case con un pelado. Margarita cae enferma de melancolía y amenaza con morir. Desesperado, el padre busca al tío solterón de Luis, don Honorato, quien ofendido por la humillación inicial exige una condición para la boda: Raimundo no podrá dar a su hija ni un solo real de dote. El padre suplica que al menos le permitan regalarle la camisa de novia; Honorato acepta creyéndola una prenda ordinaria. Don Raimundo confecciona entonces una camisa de encajes flamencos cubierta de brillantes y cordoncillos de oro valuada en una fortuna incalculable, dando origen al famoso dicho limeño: "¡Esto es más caro que la camisa de Margarita!".'
        },
        {
          titulo: '"Al pie de la letra" (La ingenuidad militar del capitán Paiva)',
          detalle: 'El capitán Paiva, militar corpulento y valiente del ejército del general Salaverry, padece de una absoluta incapacidad para comprender metáforas o dobles sentidos: ejecuta cualquier orden estrictamente al pie de la letra. Salaverry lo envía a allanar una casa sospechosa diciéndole: "Ve y si te ponen reparos, te haces el sordo y no dejes títere con cabeza". Paiva ingresa y decapita a todos los ocupantes de la vivienda. En otra ocasión, Salaverry le dice exasperado tras una torpeza: "¡Hombre, vete a tirar de un tiro al río!". Horas después le avisan que Paiva se marchó al río Rímac y se descerrajó un tiro en la cabeza, consumando con trágica ingenuidad la orden literal de su superior.'
        }
      ],
      personajes: [
        { nombre: 'Ricardo Palma', rol: 'Narrador costumbrista', descripcion: 'Cronista socarrón, erudito y ameno que recrea la identidad nacional con gracejo criollo y elegancia hispana.' },
        { nombre: 'Francisco Javier de Luna Pizarro', rol: 'Seminario rebelde', descripcion: 'Niño arequipeño precoz y audaz que desafía los azotes del obispo Chávez de la Rosa con ingenio.' },
        { nombre: 'Don Dimas de la Tijereta', rol: 'Escribano pícaro', descripcion: 'Tinterillo limeño que derrota jurídicamente al diablo mediante la precisión semántica del idioma.' },
        { nombre: 'Margarita Pareja', rol: 'Dama aristocrática', descripcion: 'Joven limeña cuya pasión amorosa obliga a su acaudalado padre a burlar la prohibición de la dote nupcial.' },
        { nombre: 'Capitán Paiva', rol: 'Soldado hiperliteral', descripcion: 'Militar gigante que carece de discernimiento figurado y obedece las órdenes militares con exactitud destructiva.' }
      ],
      temasClave: [
        { titulo: 'El ingenio criollo como defensa', explicacion: 'La picardía, la labia y el humor como herramientas de los personajes para eludir la rigidez de los dogmas coloniales.' },
        { titulo: 'La desmitificación de la historia solemne', explicacion: 'Los próceres, virreyes y prelados son retratados no como estatuas de bronce inanimadas, sino como seres de carne y hueso llenos de flaquezas y pasiones.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide del romanticismo y el costumbrismo peruano. Colección de relatos amenos y satíricos que funden la verdad histórica con la fantasía popular para explicar los dichos y anécdotas más pintorescas del pasado nacional.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Tradición (creación autóctona palmista)' },
        { clave: 'Autor', valor: 'Manuel Ricardo Palma Soriano ("El Bibliotecario Mendigo")' },
        { clave: 'Etapas históricas que abarca', valor: 'Incanato, Conquista, Virreinato y Emancipación/República' },
        { clave: 'Labor pública heroica', valor: 'Reconstrucción de la Biblioteca Nacional tras el saqueo de la ocupación chilena' }
      ],
      elementosClave: [
        { titulo: 'Estructura en tres tiempos', contenido: 'Presentación del ambiente histórico + anécdota de costumbres + sentencia final que explica el refrán criollo.' },
        { titulo: 'El lenguaje palmista', contenido: 'Síntesis armoniosa de la pureza clásica del idioma cervantino con giros coloquiales y modismos propios de Lima.' },
        { titulo: 'Evolución de las publicaciones', contenido: 'Publicadas inicialmente en periódicos y reunidas posteriormente en series definitivas entre 1872 y 1910.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿En qué consiste la especie literaria "Tradición" creada por Ricardo Palma?',
          respuesta: 'Es una forma narrativa mixta que combina la seriedad del dato documental de la crónica histórica con la soltura amena, la ficción y el humor pícaro del cuadro de costumbres.'
        },
        {
          pregunta: '¿Por qué la tradición "Don Dimas de la Tijereta" vence legalmente a Satanás?',
          respuesta: 'Porque Dimas prometió entregar su "almilla", término que en el léxico castellano designa una prenda interior de vestir y no el alma espiritual inmortal.'
        }
      ]
    }
  },
  {
    id: 'aves-sin-nido',
    titulo: 'Aves sin nido',
    autor: 'Clorinda Matto de Turner',
    año: '1889',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Novela',
    corriente: 'Precursora del Indigenismo (Realismo Peruano)',
    temaPrincipal: 'La opresión y explotación feudal del indígena andino por la trinidad corrupta (el cura, el gobernador y el juez) y el amor truncado por el incesto.',
    portadaGradiente: 'linear-gradient(145deg, #164e63 0%, #0e7490 50%, #155e75 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'En el pueblo andino de Kíllac, los indígenas son sistemáticamente despojados de sus bienes y trabajo por la alianza corrupta entre el párroco Pascual Vargas, el gobernador Sebastián Pancorbo y las autoridades locales. La llegada de los esposos Fernando y Lucía Marín, forasteros letrados de espíritu progresista, enciende la esperanza al defender a la familia indígena de Juan y Marcela Yupanqui. Sin embargo, los poderosos atacan con violencia su casona, provocando la muerte de los esposos Yupanqui. Sus hijas huérfanas son acogidas por los Marín. El joven Manuel, hijastro del gobernador, se enamora de la huérfana Margarita; cuando deciden casarse en Lima, descubren aterrados que ambos son hijos biológicos del mismo sacerdote corrupto: el obispo Pedro de Miranda y Claro.',
      contextoHistorico: 'Publicada en 1889 tras la Guerra del Pacífico. Inaugura la novela de reivindicación indígena en América Latina y provocó la excomunión de la autora por su valiente denuncia del abuso sexual y económico del clero provinciano.',
      analisisTrama: [
        {
          titulo: 'El pueblo de Kíllac y la trilogía de la opresión (Capítulos I - V)',
          detalle: 'Se retrata el pueblo andino ficticio de Kíllac, un paisaje de belleza natural paradisíaca donde impera el infierno social de la explotación. Los indígenas son víctimas indefensas de la "trilogía opresora": el cura Pascual Vargas (lujurioso y codicioso), el gobernador Sebastián Pancorbo (cruel y borrachín) y los jueces cobradores. Se aplican abusos feudales como el reparto de lanas: entregan dinero adelantado a la fuerza a los campesinos y luego les confiscan toda su producción a precios ínfimos bajo amenaza de cárcel.'
        },
        {
          titulo: 'El ruego de Marcela Yupanqui y la intervención de Lucía Marín (Capítulos VI - X)',
          detalle: 'Marcela Yupanqui, esposa del indio Juan, acude desesperada ante Lucía Marín, esposa del comerciante y hacendado progresista Fernando Marín recién asentado en Kíllac. Marcela llora de rodillas confesando que no tienen cómo pagar el dinero exigido por el párroco para el entierro de su suegra, y que las autoridades amenazan con embargarles a sus dos pequeñas hijas, Margarita y Rosalía, para emplearlas como servidumbre en las haciendas. Conmovida en sus fibras más íntimas, Lucía paga las deudas y Fernando intercede ante el cura y el gobernador exigiendo el cese de los cobros abusivos.'
        },
        {
          titulo: 'La asamblea gamonal y el asalto sangriento a la casa de los Marín (Capítulos XI - XVIII)',
          detalle: 'Sintiéndose amenazados por la intromisión de los forasteros que pretenden hacer cumplir las leyes civiles, el cura y el gobernador reúnen a los notables y azuzan a una turba armada mediante campanas tocadas a rebato para linchar a los esposos Marín. Durante la noche, la turba cerca la casona con fusiles y piedras. Los indios Juan y Marcela Yupanqui corren a defender a sus protectores; Juan muere acribillado por las balas y Marcela es herida de muerte. El asalto es contenido milagrosamente gracias a la llegada del joven estudiante de derecho Manuel (hijo de doña Petronila y supuesto hijo del gobernador) y de otros vecinos sensatos.'
        },
        {
          titulo: 'El juramento de Marcela y la orfandad de las niñas (Capítulos XIX - XXV)',
          detalle: 'En su lecho de agonía en la casa de los Marín, Marcela Yupanqui pide hablar a solas con Lucía; antes de expirar, le confiesa al oído un secreto atroz sobre el verdadero origen biológico de su primogénita Margarita. Lucía y Fernando adoptan formalmente a las dos niñas huérfanas, Margarita y Rosalía, protegiéndolas como hijas propias. Manuel, impresionado por la nobleza de Lucía, rompe con su padrastro el gobernador y decide apoyar incondicionalmente a la familia Marín en los tribunales.'
        },
        {
          titulo: 'El romance puro de Manuel y Margarita y el éxodo en tren (Capítulos XXVI - XXX)',
          detalle: 'Nace un amor transparente y apasionado entre Manuel y la bella Margarita. Manuel, tras cursar leyes, aspira a graduarse y desposar a la joven. Sin embargo, ante el peligro constante y la hostilidad persistente en Kíllac, los esposos Marín deciden liquidar sus negocios y abandonar definitivamente el pueblo para establecerse en Lima. El viaje se realiza por el nuevo ferrocarril andino, símbolo del progreso material que contrasta con el retraso feudal de la sierra.'
        },
        {
          titulo: 'La revelación del incesto en el Hotel Imperial de Lima (Capítulo final)',
          detalle: 'En el Hotel Imperial de Lima, Manuel alcanza con alegría a la familia Marín y pide formalmente la mano de Margarita ante don Fernando y doña Lucía. Fernando, creyendo oportuno evitar prejuicios futuros, revela a Manuel que Margarita no es hija biológica de Juan Yupanqui, sino fruto de los abusos cometidos por el antiguo párroco de Kíllac, don Pedro de Miranda y Claro (más tarde encumbrado como obispo). Al escuchar el nombre, Manuel palidece y cae destruido por el dolor: confiesa que él también es hijo biológico del mismo obispo Miranda y Claro. Margarita y Manuel son hermanos de padre. La novela concluye con un grito de agonía moral y llanto impotente ante las dos aves sin nido cuyo amor es pulverizado por la corrupción moral de la Iglesia colonial.'
        }
      ],
      personajes: [
        { nombre: 'Margarita Yupanqui', rol: 'Joven huérfana inocente', descripcion: 'Muchacha bondadosa y sensible que ignora su origen clandestino hasta el desenlace de la tragedia.' },
        { nombre: 'Manuel', rol: 'Joven estudiante de derecho', descripcion: 'Hijo natural de noble corazón que defiende a los indios y busca en el derecho la redención de su pueblo.' },
        { nombre: 'Lucía Marín', rol: 'Dama progresista y cristiana', descripcion: 'Encarna la caridad activa y el espíritu redentor que desafía las convenciones corruptas de la provincia.' },
        { nombre: 'Fernando Marín', rol: 'Empresario ilustrado', descripcion: 'Esposo de Lucía, hombre de ciencia y civismo que cree en la modernización y la justicia civil.' },
        { nombre: 'Párroco Pascual Vargas', rol: 'Sacerdote opresor', descripcion: 'Párroco codicioso y lujurioso que despoja a los campesinos y desata la violencia colectiva.' },
        { nombre: 'Obispo Pedro de Miranda y Claro', rol: 'Causa del incesto trágico', descripcion: 'Antiguo párroco de Kíllac que sembró hijos clandestinos en mujeres del pueblo, origen del drama de Margarita y Manuel.' }
      ],
      temasClave: [
        { titulo: 'La trilogía de la opresión feudal', explicacion: 'La alianza simbiótica entre el clero, el poder político y los jueces para mantener al indio en servidumbre.' },
        { titulo: 'El celibato sacerdotal como foco de inmoralidad', explicacion: 'La denuncia valiente de cómo el poder clerical desampara a los hijos ilegítimos fruto del abuso a mujeres indefensas.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Novela precursora del indigenismo y cumbre del realismo peruano. Denuncia la explotación de los campesinos de Kíllac por las autoridades locales y culmina en la tragedia de Margarita y Manuel, cuyo amor se revela como un incesto involuntario al ser hijos del mismo obispo.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela social' },
        { clave: 'Autora', valor: 'Clorinda Matto de Turner (Cusco)' },
        { clave: 'Año de publicación', valor: '1889' },
        { clave: 'Escenario geográfico', valor: 'Pueblo de Kíllac (sierra sur) y Lima' },
        { clave: 'Eje de la denuncia', valor: 'La trilogía opresora: cura, gobernador y juez de paz' }
      ],
      elementosClave: [
        { titulo: 'El reparto de lanas', contenido: 'Mecanismo usurero mediante el cual las autoridades endeudaban a la fuerza a los indígenas para arrebatarles sus rebaños.' },
        { titulo: 'Consecuencias para la autora', contenido: 'Matto de Turner fue excomulgada por la Iglesia católica, su efigie quemada en público y su imprenta saqueada.' },
        { titulo: 'El símbolo de las aves sin nido', contenido: 'Alusión poética a los huérfanos desamparados y desposeídos que no tienen hogar seguro en su propia tierra.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué no pueden contraer matrimonio Manuel y Margarita al final de la novela?',
          respuesta: 'Porque descubren que ambos son hijos biológicos ilegítimos del mismo sacerdote, el obispo Pedro de Miranda y Claro, configurándose una relación de hermanos de padre.'
        },
        {
          pregunta: '¿Quiénes integran la trinidad que explota a los indígenas en Kíllac?',
          respuesta: 'El clero (párroco Pascual Vargas), el poder político (gobernador Sebastián Pancorbo) y los notables cobradores/jueces de la provincia.'
        }
      ]
    }
  },
  {
    id: 'el-caballero-carmelo',
    titulo: 'El Caballero Carmelo',
    autor: 'Abraham Valdelomar',
    año: '1913',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Cuento costumbrista y nostálgico',
    corriente: 'Posmodernismo (Movimiento Colónida)',
    temaPrincipal: 'La memoria hogareña provinciana, el honor caballeresco encarnado en un animal doméstico y la dolorosa fragilidad de la vida.',
    portadaGradiente: 'linear-gradient(145deg, #831843 0%, #be185d 50%, #500724 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'En la caleta de San Andrés y la villa costera de Pisco, la familia del niño Abraham recibe al hermano mayor Roberto, quien regresa de largos viajes trayendo consigo regalos y un gallo de estampa altiva al que bautizan como el Caballero Carmelo. Tras tres años de pacífica y entrañable convivencia doméstica, el padre acepta un duelo de honor para el 28 de julio enfrentándolo contra el Ajiseco, un gallo más joven y feroz. En una sangrienta y desigual contienda en el coliseo, el viejo Carmelo triunfa con una estocada mortal agónica; tras dos días de convalecencia en el hogar, el noble gallo fallece, sumiendo a la familia en una imborrable melancolía.',
      contextoHistorico: 'Publicado en 1913 en el diario La Nación de Lima tras ganar el concurso literario de dicho medio. Marca la superación del modernismo retórico y el advenimiento de una prosa intimista, cromática y de ternura provinciana.',
      analisisTrama: [
        {
          titulo: 'El retorno de Roberto y los regalos familiares en Pisco (Capítulo I)',
          detalle: 'Tras larga ausencia, el hermano mayor Roberto regresa al hogar familiar en Pisco montado a caballo. Es recibido con alborozo por la madre, el padre y los hermanos pequeños. De sus alforjas extrae regalos cargados de significado: quesos de Huacho, frutas secas, una botella de pisco y una jaula de madera de donde extrae un gallo de plumaje tornasolado, mirada fiera y andar aristocrático, a quien entregan a los cuidados de los niños.'
        },
        {
          titulo: 'La estampa heroica del Caballero Carmelo (Capítulo II)',
          detalle: 'Se describe poéticamente la figura del Carmelo, equiparándola con la armadura de un caballero medieval: cabeza roja de plumas sedosas, ojos dorados y penetrantes, pecho ancho y combado, alas de color canela y patas armadas de afilados espolones. El gallo se convierte en el guardián orgulloso de la casa, despertando a los vecinos con su canto al alba y conviviendo con el patético y cobarde gallo Pelado.'
        },
        {
          titulo: 'Tres años de apacible vida doméstica y memoria infantil (Capítulo III)',
          detalle: 'Transcurren tres años de felicidad serena en la campiña pisqueña de San Andrés. El Carmelo envejece con dignidad rodeado del cariño de los hermanos (Abraham, Jesús, Anfiloquio). Los niños juegan con él, lo alimentan con granos escogidos y lo contemplan como el héroe insustituible del corral.'
        },
        {
          titulo: 'El anuncio del desafío del 28 de julio contra el Ajiseco (Capítulo IV)',
          detalle: 'Una tarde, el padre llega a la casa con semblante sombrío y anuncia que ha pactado una pelea formal para las Fiestas Patrias del 28 de julio en el coliseo de San Andrés. El anciano Carmelo deberá medirse contra el temible Ajiseco, un gallo joven, vigoroso, invicto y reputado como sanguinario. La madre y los niños palidecen de angustia al comprender que el viejo héroe es conducido a una muerte segura por razones de honor masculino.'
        },
        {
          titulo: 'La sangrienta batalla en el coliseo de San Andrés (Capítulo V)',
          detalle: 'Llega el 28 de julio y la familia asiste compungida al coliseo rústico abarrotado de aficionados y apostadores. Se sueltan ambos animales al ruedo. El Ajiseco, más ágil y corpulento, ataca con furia implacable desgarrando el plumaje del Carmelo y bañándolo en sangre; el viejo gallo esquiva los embates tambaleándose, mientras los espectadores dan por perdida la pelea y gritan: "¡Cien a diez por el Ajiseco!". El Carmelo rueda por la arena herido en el pecho; el Ajiseco canta victoria con insolencia. En ese momento supremo, sacando un último aliento de dignidad herida, el Carmelo se reincorpora súbitamente, abre las alas ensangrentadas y clava su espolón en el ojo y la cabeza de su rival, dejándolo muerto en el acto en la arena. La multitud estalla en vítores ante la hazaña heroica.'
        },
        {
          titulo: 'La agonía dolorosa en el hogar y el luto imperecedero (Capítulo VI)',
          detalle: 'El Carmelo es transportado en brazos al hogar familiar como un vencedor moribundo. Durante dos días, la madre y los hermanos curan sus heridas con aguardiente y caricias, administrándole granos tibios y agua en el pico. El gallo apenas logra sostenerse en pie; al atardecer del segundo día, se acerca a la ventana, contempla por última vez el sol dorado hundiéndose en el mar de Pisco, bate débilmente las alas y cae inerte sobre la hierba. Su muerte sume a la casa en un silencio desgarrador, dejando en el alma de los niños el primer dolor irremediable de la infancia.'
        }
      ],
      personajes: [
        { nombre: 'El Caballero Carmelo', rol: 'Protagonista heroico', descripcion: 'Gallo aristocrático y noble que personifica la valentía caballeresca, el deber y la dignidad ante la muerte.' },
        { nombre: 'El Ajiseco', rol: 'Antagonista fiero', descripcion: 'Gallo joven, agresivo y soberbio cuya impaciencia le cuesta la vida frente a la veteranía del Carmelo.' },
        { nombre: 'Abraham', rol: 'Narrador infantil', descripcion: 'Niño sensible y observador que recrea con nostalgia y ternura la atmósfera hogareña provinciana.' },
        { nombre: 'Roberto', rol: 'Hermano mayor', descripcion: 'Joven viajero que regresa como figura protectora y obsequia el gallo a la familia.' },
        { nombre: 'El Padre', rol: 'Patriarca aficionado', descripcion: 'Hombre severo y apasionado de la gallística que acepta el reto por honor social.' }
      ],
      temasClave: [
        { titulo: 'La dignidad y el honor heroico', explicacion: 'El Carmelo prefiere expirar en la arena antes que huir cobardemente ante el rival.' },
        { titulo: 'El tono elegíaco y la pérdida de la inocencia', explicacion: 'La muerte del gallo simboliza el fin de la edad dorada de la niñez y el encuentro inevitable con el dolor humano.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cuento cumbre de la narrativa posmodernista peruana. Relata la hazaña y agonía del gallo Caballero Carmelo, quien vence heroicamente al feroz Ajiseco en el coliseo de San Andrés para expirar dos días después en el hogar, dejando un duelo imperecedero en la infancia de Abraham Valdelomar.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Cuento costumbrista / evocativo' },
        { clave: 'Autor', valor: 'Abraham Valdelomar Pinto ("El Conde de Lemos")' },
        { clave: 'Grupo literario', valor: 'Movimiento Colónida (1916)' },
        { clave: 'Escenario geográfico', valor: 'Pisco y la caleta de pescadores de San Andrés' },
        { clave: 'Fecha del combate', valor: '28 de julio (Fiestas Patrias)' }
      ],
      elementosClave: [
        { titulo: 'El cromatismo poético', contenido: 'Uso magistral de colores y adjetivos: plumaje tornasolado, ojos de oro, arena roja y ocaso crepuscular.' },
        { titulo: 'El gallo Pelado', contenido: 'Contrapunto cómico del Carmelo: gallo desgarbado que sobrevive a base de cobardía y picardía en el corral.' },
        { titulo: 'El duelo de honor', contenido: 'La pelea representa la obligación moral del linaje donde el animal asume el deber del honor familiar.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué el padre de Abraham acepta hacer pelear al Carmelo si ya estaba viejo?',
          respuesta: 'Porque un amigo de la comarca cuestionó el valor de sus animales y el honor gallístico del padre no toleró el desafío público.'
        },
        {
          pregunta: '¿Cómo logra el Carmelo vencer al Ajiseco en el ruedo?',
          respuesta: 'Cuando yacía moribundo en la arena y todos lo daban por vencido, se incorporó con un último arranque de coraje y clavó certeramente su espolón en la cabeza de su rival.'
        }
      ]
    }
  },
  {
    id: 'yawar-fiesta',
    titulo: 'Yawar Fiesta',
    autor: 'José María Arguedas',
    año: '1941',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Novela',
    corriente: 'Indigenismo',
    temaPrincipal: 'La defensa de la identidad cultural andina frente a la imposición costeña y la reinterpretación rebelde de las costumbres españolas.',
    portadaGradiente: 'linear-gradient(145deg, #14532d 0%, #15803d 50%, #052e16 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'En el pueblo andino de Puquio (Lucanas, Ayacucho), los cuatro ayllus indígenas (Pichk\'achuri, K\'ayau, Chaupi y K\'ollana) se alistan para celebrar las Fiestas Patrias del 28 de julio con el tradicional Turupukllay (corrida de toros india sin picadores ni rejoneadores, donde centenares de campesinos enfrentan a un toro salvaje con dinamita y ponchos). El nuevo subprefecto costeño prohíbe la fiesta considerándola un espectáculo de barbarie e impone contratar a un torero español profesional. Para no renunciar a su rito, los comuneros capturan en las punas al mítico toro Misitu. Tras el fracaso ridículo del torero foráneo, los indios invaden la arena y consuman la fiesta sangrienta a la usanza ancestral.',
      contextoHistorico: 'Primera novela de José María Arguedas publicada en 1941. Refleja las profundas tensiones sociopolíticas entre la oligarquía terrateniente (mistis), las autoridades centrales impuestas por Lima y la masa indígena organizada en ayllus.',
      analisisTrama: [
        {
          titulo: 'El pueblo de Puquio y la rivalidad entre los cuatro ayllus (Capítulos I - III)',
          detalle: 'Se describe la topografía social de Puquio, dividido entre los barrios altos donde habitan los indios agrupados en cuatro ayllus tradicionales (Pichk\'achuri, K\'ayau, Chaupi y K\'ollana) y el centro urbano habitado por los hacendados mestizos (mistis). Existe una fervorosa competencia anual por demostrar qué ayllu es el más intrépido y digno durante la fiesta del 28 de julio.'
        },
        {
          titulo: 'La circular del subprefecto y la prohibición del Turupukllay (Capítulos IV - V)',
          detalle: 'Llega a Puquio un nuevo subprefecto costeño enviado desde Lima, quien se horroriza al enterarse de cómo se celebra la corrida india: en una plaza cercada con palos, los comuneros enfrentan a la fiera cuerpo a cuerpo armados solo de sus ponchos y cartuchos de dinamita amarrados a los cuernos, sufriendo muertes y destripamientos atroces. El subprefecto emite una circular prohibiendo terminantemente la corrida tradicional e imponiendo contratar a un torero profesional en Lima para realizar una corrida "a la civilizada española".'
        },
        {
          titulo: 'La fractura social: mistis, indios y los estudiantes en Lima (Capítulos VI - VII)',
          detalle: 'La orden causa conmoción. Los hacendados tradicionales se dividen: unos (como don Julián Arangüena) protestan porque la fiesta brava india forma parte de su dominio señorial, mientras otros (como el vicario) aplauden la modernización. En Lima, los estudiantes provincianos del Centro Unión Lucanas apoyan formalmente la erradicación de la barbarie, contratando al torero español Conchudo Ibarrena para enviarlo a Puquio, desconociendo que con ello silencian el alma colectiva de su pueblo.'
        },
        {
          titulo: 'La captura épica del toro mítico Misitu en las punas (Capítulo VIII)',
          detalle: 'Para garantizar la grandeza del festejo, el ayllu de K\'ayau se compromete a traer a la plaza al Misitu, un toro salvaje legendario que pasta en los queñuales de Negromayo en las altas punas de K\'oñani, temido porque los pastores creen que nació del lago y que mata a quien se le acerca. Al mando del indio Raura y desafiando el frío y los matorrales incendiados, decenas de comuneros enlazan al monstruo y lo arrastran atado a través de los desfiladeros hasta conducirlo triunfalmente a los corrales de Puquio.'
        },
        {
          titulo: 'El día de la corrida y el ridículo del torero español (Capítulos IX - X)',
          detalle: 'El 28 de julio, miles de indígenas bajan de los cerros copando las graderías y los muros de la plaza de Pichk\'achuri entonando el wakawak\'ra (trompeta de cuerno). Sale a la arena el torero español Ibarrena vestido con su traje de luces; al soltar al enfurecido Misitu, la fiera embiste bramando con furia colosal. Aterrado ante semejante bestia sin despuntar, el torero español corre despavorido, suelta la muleta y trepa a las barreras buscando refugio, en medio de la rechifla atronadora de toda la multitud.'
        },
        {
          titulo: 'La invasión del ruedo y la consumación del rito sangriento (Capítulo final)',
          detalle: 'Ante el ridículo del torero foráneo, los comuneros reclaman su turno. El alcalde mestizo y los guardias son rebasados por la multitud que derriba las vallas. Los capeadores indios del ayllu K\'ayau entran en masa al ruedo con sus ponchos; el torero aficionado local Wallpa es alcanzado por un pitazo brutal que le desgarra la pierna en medio de alaridos de euforia colectiva. El indio Raura se arroja sobre la fiera y le coloca un cartucho de dinamita en el lomo; la detonación destaza el cuerpo del toro entre vítores y cantos andinos. El alcalde don Antenor exclama con resignación ante el pálido subprefecto: "¿Ve usted, señor subprefecto? Esta es nuestra fiesta; así son nuestros indios; ¡esto es Yawar Fiesta!".'
        }
      ],
      personajes: [
        { nombre: 'El toro Misitu', rol: 'Símbolo telúrico', descripcion: 'Fiera indómita nacida de la mitología de las punas, encarnación de la naturaleza rebelde que solo el coraje indio puede someter.' },
        { nombre: 'El Subprefecto', rol: 'Autoridad costeña foránea', descripcion: 'Funcionario limeño que desprecia la cultura andina por considerarla salvaje y busca imponer la modernización por decreto.' },
        { nombre: 'Don Julián Arangüena', rol: 'Hacendado gamonal de K\'oñani', descripcion: 'Terrateniente orgulloso y violento que presume de ser el dueño del Misitu pero es incapaz de domarlo.' },
        { nombre: 'Ibarrena', rol: 'Torero español profesional', descripcion: 'Diestro contratado para la corrida civilizada que huye aterrorizado ante la furia del toro salvaje.' },
        { nombre: 'El indio Raura', rol: 'Héroe comunal', descripcion: 'Comunero intrépido que lidera la captura del toro y coloca el cartucho de dinamita que culmina la faena.' }
      ],
      temasClave: [
        { titulo: 'El Turupukllay como afirmación de identidad', explicacion: 'La corrida andina no es una copia sumisa de la tauromaquia hispana, sino su reapropiación violenta y colectiva por los ayllus.' },
        { titulo: 'El fracaso del centralismo homogeneizador', explicacion: 'La imposición burocrática de Lima choca contra la fuerza inmemorial de las tradiciones andinas.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Primera novela de José María Arguedas. Retrata el conflicto cultural en el pueblo de Puquio cuando el subprefecto prohíbe la corrida de toros tradicional indígena (Turupukllay), culminando en el triunfo del rito ancestral sobre la tauromaquia foránea española.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela indigenista' },
        { clave: 'Autor', valor: 'José María Arguedas Altamirano' },
        { clave: 'Año de publicación', valor: '1941' },
        { clave: 'Escenario geográfico', valor: 'Puquio (Lucanas, Ayacucho) y las punas de K\'oñani' },
        { clave: 'Significado del título', valor: 'Yawar Fiesta = Fiesta de la Sangre' }
      ],
      elementosClave: [
        { titulo: 'Los cuatro ayllus de Puquio', contenido: 'Pichk\'achuri, K\'ayau, Chaupi y K\'ollana, células organizativas que preservan la memoria y la acción comunal.' },
        { titulo: 'El wakawak\'ra', contenido: 'Instrumento de viento hecho con cuernos de toro cuyo sonido desgarrador acompaña las faenas de captura y lidia.' },
        { titulo: 'El cóndor en el lomo', contenido: 'Aunque en esta novela se usa dinamita, la tradición oral asocia también el rito al ave sagrada amarrada a la fiera como símbolo de la pugna indígena-española.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué fracasa la orden del subprefecto de imponer un torero español?',
          respuesta: 'Porque el torero Ibarrena se paraliza de terror ante la furia del Misitu, demostrando que las reglas académicas europeas son inútiles ante la naturaleza salvaje andina.'
        },
        {
          pregunta: '¿Qué representa la captura del toro Misitu por los comuneros de K\'ayau?',
          respuesta: 'La capacidad heroica y colectiva de los indígenas para dominar a las fuerzas indómitas de la naturaleza mediante la solidaridad y el trabajo comunitario.'
        }
      ]
    }
  },
  {
    id: 'cien-anos-de-soledad',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    año: '1967',
    pais: 'Colombia',
    genero: 'Narrativo',
    especie: 'Novela épica moderna',
    corriente: 'Boom Latinoamericano (Realismo Mágico)',
    temaPrincipal: 'La soledad trágica, la fatalidad del tiempo circular y la condena al olvido de las siete generaciones de la estirpe Buendía en Macondo.',
    portadaGradiente: 'linear-gradient(145deg, #042f2e 0%, #0d9488 50%, #134e4a 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'A lo largo de un siglo, la novela relata la historia de la familia Buendía en el pueblo mítico de Macondo, fundado por José Arcadio Buendía y Úrsula Iguarán huyendo del fantasma de Prudencio Aguilar. A través de siete generaciones marcadas por nombres repetidos, el incesto, las guerras civiles del coronel Aureliano Buendía, el auge devastador de la compañía bananera norteamericana y cuatro años de lluvias torrenciales, la estirpe avanza hacia su extinción final cuando nace el último vástago con cola de cerdo, mientras se descifran los pergaminos del gitano Melquíades que profetizaban la destrucción de Macondo por un viento huracanado.',
      contextoHistorico: 'Publicada en Buenos Aires (Editorial Sudamericana) en 1967. Obra cumbre de las letras hispanoamericanas del siglo XX, galardonada con el Premio Nobel de Literatura en 1982. Convirtió el realismo mágico en un fenómeno estético planetario.',
      analisisTrama: [
        {
          titulo: 'La fundación de Macondo y los prodigios del gitano Melquíades (Generaciones I y II)',
          detalle: 'José Arcadio Buendía y su prima Úrsula Iguarán contraen matrimonio pese al temor ancestral a engendrar un hijo con cola de cerdo por su parentesco. Tras matar en duelo de honor a Prudencio Aguilar, quien se burló de su hombría, los remordimientos y las apariciones del espectro empujan a la pareja a cruzar la sierra y fundar en la selva caribeña una aldea de barro y cañabrava: Macondo. El pueblo es visitado periódicamente por una tribu de gitanos liderada por Melquíades, quien introduce inventos prodigiosos: imanes que arrancan los clavos de las casas, lupas astronómicas gigantescas y el hielo, que deslumbra al pequeño Aureliano.'
        },
        {
          titulo: 'La peste del insomnio y la llegada del poder político (Generación II)',
          detalle: 'Llega a la casa la niña huérfana Rebeca trayendo consigo la peste del insomnio. Toda la aldea pierde la capacidad de dormir y, en consecuencia, empieza a sufrir la peste del olvido. Para no perder la memoria de las cosas, José Arcadio Buendía cuelga letreros en los objetos ("Esta es la mesa", "Esta es la vaca y debe ordeñarse cada mañana"), hasta que Melquíades regresa de la muerte con un bebedizo que restituye los recuerdos y se queda a vivir en la casa redactando unos enigmáticos pergaminos en sánscrito. Poco después, el gobierno central envía al corregidor Apolinar Moscote para imponer impuestos y leyes conservadoras; los Buendía aceptan su presencia tras obligarlo a retirar a sus guardias armados, y Aureliano se enamora de la pequeña hija del corregidor, Remedios Moscote.'
        },
        {
          titulo: 'Las 32 guerras civiles del coronel Aureliano Buendía (Generación II y III)',
          detalle: 'Tras la muerte prematura de su joven esposa Remedios y ante el fraude descarado de los conservadores, Aureliano se proclama militar y encabeza la insurrección armada liberal como el legendario coronel Aureliano Buendía. Promueve 32 guerras civiles consecutivas, escapa a catorce atentados, sobrevive a pelotones de fusilamiento y engendra 17 hijos varones con distintas mujeres durante sus campañas militares (los 17 Aurelianos marcados con cruces de ceniza que serán asesinados uno tras otro). Desengañado de la vanidad del poder y del vacío de la política, firma la capitulación de Neerlandia, intenta suicidarse de un tiro en el pecho que esquiva el corazón y se encierra hasta su vejez en su taller de platería fabricando pescaditos de oro que luego vuelve a fundir en un ciclo sin fin.'
        },
        {
          titulo: 'El auge febril, la compañía bananera y la masacre de la estación (Generaciones IV y V)',
          detalle: 'Macondo se conecta al mundo exterior mediante el ferrocarril traído por Aureliano Triste. Se instala la todopoderosa compañía bananera estadounidense (Mr. Brown), desatando una fiebre de dinero, prostitución y transformaciones aceleradas. Remedios la Bella, cuya hermosura enloquece a los hombres, asciende al cielo en cuerpo y alma entre sábanas de encaje. Años después, los trabajadores de las plantaciones bananeras van a la huelga reclamando condiciones humanas; el ejército cerca a miles de campesinos con sus mujeres y niños en la estación del tren y los ametralla despiadadamente. José Arcadio Segundo despierta en un tren nocturno de trescientos vagones cargado de cadáveres arrojados al mar; al regresar a Macondo descubre que el gobierno ha decretado que allí nunca ocurrió nada, borrando el crimen de la memoria colectiva.'
        },
        {
          titulo: 'El diluvio de casi cinco años y la lenta agonía de la casa (Generaciones V y VI)',
          detalle: 'Apenas perpetrada la masacre, comienza a llover sobre Macondo durante cuatro años, once meses y dos días. Las lluvias incesantes destruyen las plantaciones, marchitan los negocios y desarticulan el pueblo. Al cesar el diluvio, la centenaria matriarca Úrsula Iguarán, ciega pero clarividente, muere a edad bíblica; la casa señorial es invadida por la humedad, el comején y el polvo rojo. La familia se desmorona en el aislamiento: José Arcadio es asesinado en la bañera por muchachos ladrones, y solo sobrevive en el cuarto de Melquíades el joven bastardo Aureliano Babilonia, entregado al estudio obsesivo de lenguas antiguas para descifrar los pergaminos.'
        },
        {
          titulo: 'El último amor prohibido, el niño con cola de cerdo y el fin del mundo (Generaciones VI y VII)',
          detalle: 'Regresa de Europa Amaranta Úrsula, tía de Aureliano Babilonia. Ignorando su estrecho lazo de consanguinidad, ambos se entregan a un amor torrencial y clandestino en las ruinas de la mansión. Amaranta Úrsula da a luz al último hijo de la estirpe: un varón que nace con cola de cerdo, consumando el terror original de los fundadores. La madre muere desangrada en el parto; Aureliano, enloquecido por la pena, deambula por el pueblo desierto embriagándose. Al regresar a la casa, encuentra horrorizado que las hormigas coloradas están devorando el cadáver del recién nacido en el patio. En ese instante de lucidez cósmica, Aureliano comprende la clave final de los pergaminos de Melquíades y empieza a leerlos en voz alta: "El primero de la estirpe está amarrado a un árbol y al último se lo están comiendo las hormigas". Mientras lee con avidez la historia de su propia familia antes de que acontezca, se desata sobre Macondo un viento huracanado bíblico que arranca los tejados y borra para siempre la ciudadela de la memoria, "porque las estirpes condenadas a cien años de soledad no tenían una segunda oportunidad sobre la tierra".'
        }
      ],
      personajes: [
        { nombre: 'Úrsula Iguarán', rol: 'Matriarca imperecedera', descripcion: 'Eje moral, económico y vital de los Buendía que sostiene la casa durante más de un siglo gracias a su laboriosidad y sentido común.' },
        { nombre: 'José Arcadio Buendía', rol: 'Fundador y patriarca', descripcion: 'Hombre de imaginación desbordada obsesionado con la ciencia y los inventos de los gitanos, termina atado a un castaño conversando con espectros.' },
        { nombre: 'Coronel Aureliano Buendía', rol: 'Líder revolucionario', descripcion: 'Primer nacido en Macondo, guerrero trágico de 32 contiendas armadas que termina encerrado en su taller fundiendo pescaditos de oro.' },
        { nombre: 'Melquíades', rol: 'Gitano sabio y demiurgo', descripcion: 'Sabio intemporal que redacta en sánscrito el destino fatal de los Buendía un siglo antes de que ocurra.' },
        { nombre: 'Remedios la Bella', rol: 'Símbolo del realismo mágico', descripcion: 'Criatura desprovista de malicia terrenal cuya hermosura sobrehumana culmina con su ascensión al cielo entre sábanas blancas.' },
        { nombre: 'Aureliano Babilonia', rol: 'Último descifrador', descripcion: 'Erudito solitario que lee en los pergaminos la sentencia final mientras el huracán aniquila a Macondo.' }
      ],
      temasClave: [
        { titulo: 'El tiempo circular y la repetición cíclica', explicacion: 'La estirpe reproduce los mismos errores, nombres, incestos y pasiones sin aprender jamás de su pasado.' },
        { titulo: 'La soledad como destino inexorable', explicacion: 'La incapacidad de amar verdaderamente condena a cada miembro de la familia a un aislamiento ontológico insuperable.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la literatura hispanoamericana contemporánea. Epopeya mítica de siete generaciones de la familia Buendía en el pueblo de Macondo, articulada por las maravillas del realismo mágico, las guerras civiles y la soledad fatal que culmina con la destrucción del pueblo.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela del Boom Latinoamericano' },
        { clave: 'Autor', valor: 'Gabriel García Márquez ("Gabo", Aracataca, Colombia)' },
        { clave: 'Año y lugar de publicación', valor: '1967 (Buenos Aires, Editorial Sudamericana)' },
        { clave: 'Corriente estética', valor: 'Realismo Mágico (lo insólito tratado con naturalidad)' },
        { clave: 'Premio consagratorio', valor: 'Premio Nobel de Literatura 1982' }
      ],
      elementosClave: [
        { titulo: 'El mítico pueblo de Macondo', contenido: 'Microcosmos alegórico de Colombia y de toda América Latina: fundación inocente, guerra civil, explotación extranjera y desolación.' },
        { titulo: 'La masacre de las bananeras', contenido: 'Fiel reflejo histórico de la matanza real de obreros de 1928 en Ciénaga, Magdalena, silenciada por el poder gubernamental.' },
        { titulo: 'Los pergaminos de Melquíades', contenido: 'Estructura metaficcional: la novela que leemos es el mismo texto que Melquíades escribió y que Aureliano descifra al morir.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Cuál es el temor original que persigue a Úrsula Iguarán desde el inicio de la novela?',
          respuesta: 'El miedo a engendrar un hijo con cola de cerdo por haberse casado con su primo hermano José Arcadio Buendía, profecía que se cumple exactamente siete generaciones después.'
        },
        {
          pregunta: '¿Qué significa la frase de cierre de la novela?',
          respuesta: 'Que los pueblos y linajes incapaces de ejercer el amor, la memoria histórica y la solidaridad están condenados irremediablemente a la destrucción y al olvido absoluto.'
        }
      ]
    }
  },
  {
    id: 'el-tungsteno',
    titulo: 'El Tungsteno',
    autor: 'César Vallejo',
    año: '1931',
    pais: 'Perú',
    genero: 'Narrativo',
    especie: 'Novela proletaria / social',
    corriente: 'Vanguardismo / Realismo Socialista',
    temaPrincipal: 'La explotación feroz de los peones indígenas y mineros por el imperialismo minero estadounidense y la burguesía cómplice en los Andes.',
    portadaGradiente: 'linear-gradient(145deg, #1e293b 0%, #334155 50%, #0f172a 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'En el asiento minero de Quivilca (Cuzco), la empresa norteamericana Mining Society emprende la extracción intensiva de tungsteno para proveer a la industria bélica de la Primera Guerra Mundial. Con la complicidad del gobernador civil, el juez y los comerciantes Marino, los indígenas Soras son despojados mediante engaños de sus tierras comunales y obligados a trabajar en los socavones bajo condiciones inhumanas. La violación colectiva y asesinato de la humilde muchacha Graciela (la Rosada) por los notables del pueblo desata la rebelión obrera, guiada por la conciencia proletaria del herrero Huanca y el agrimensor Servando Huanca.',
      contextoHistorico: 'Publicada en Madrid en 1931 durante el exilio del autor. Representa el testimonio más lúcido de la literatura de agitación y propaganda proletaria en el Perú, inspirada en las luchas sindicales de los años 30.',
      analisisTrama: [
        {
          titulo: 'El auge de Quivilca y la llegada de la Mining Society (Capítulo I)',
          detalle: 'La pacífica aldea andina de Quivilca se transforma de la noche a la mañana en una vorágine de codicia material ante la llegada de la empresa minera norteamericana Mining Society. Llegan ingenieros extranjeros (Mister Taik y Mister Weiss) exigiendo multiplicar la producción de tungsteno a cualquier costo humano para abastecer la demanda militar en Europa. Se instalan cantinas y bazares administrados por los hermanos José y Mateo Marino, contratistas inescrupulosos que monopolizan el comercio y el alcohol.'
        },
        {
          titulo: 'El despojo rapaz de los indios Soras (Capítulo II)',
          detalle: 'Para extender las instalaciones mineras y construir caminos, la empresa codicia las tierras agrícolas de los indios Soras, comunidad pacífica que vive al margen del dinero y practica el trueque. Los hermanos Marino y el subprefecto Luna convencen a los Soras con baratijas, abalorios de vidrio y aguardiente adulterado de ceder sus parcelas fértiles. Cuando los indígenas intentan comprender el valor del papel moneda, son estafados y expulsados hacia las quebradas pedregosas.'
        },
        {
          titulo: 'La orgía y la violación de Graciela "La Rosada" (Punto de quiebre)',
          detalle: 'En el bazar de los Marino se reúnen los notables del asiento minero: el comisario Baldassari, el juez de paz, el cura Velarde y los ingenieros estadounidenses. Embriagados, juegan a los dados el cuerpo de la joven Graciela ("La Rosada"), amante de José Marino. La drogan con copas de licor hasta dejarla inconsciente y la trasladan a una habitación contigua donde todos los presentes abusan sexualmente de ella por turnos. A la mañana siguiente, Graciela amanece muerta por los vejámenes sufridos; las autoridades entierran el cadáver en secreto y amenazan de muerte a la hermana de la víctima para sellar la impunidad.'
        },
        {
          titulo: 'La conscripción militar forzosa y la muerte de dos conscriptos (Clímax social)',
          detalle: 'La escasez de peones para la mina obliga al gobernador y a los gendarmes a organizar una redada armada en las chozas campesinas para reclutar "conscriptos" para el ejército, quienes luego son vendidos como trabajadores forzados a la Mining Society. Atan con sogas a dos jóvenes indios enfermos: Braulio Conchudos e Isidoro Yépez. Tras una caminata forzada bajo el sol y sin agua, Conchudos se desploma exhausto; el capitán de gendarmes lo golpea salvajemente con la culata del fusil hasta matarlo en el camino. Los obreros y mujeres de Quivilca se amotinan con indignación arrojando piedras; la gendarmería abre fuego segando la vida de varios campesinos.'
        },
        {
          titulo: 'El debate ideológico y la forja de la revolución proletaria (Desenlace)',
          detalle: 'En una choza clandestina de la mina se reúnen el herrero y líder comunal Servando Huanca, el agrimensor intelectual y los peones mineros. Discuten las causas estructurales del abuso: no se trata de la maldad aislada de un capataz o de un juez, sino de todo un sistema económico imperialista apoyado por la burguesía y el clero nacional. Servando Huanca proclama la necesidad de unificar a los obreros de la mina y a los campesinos del agro en un solo frente revolucionario que barra con la opresión feudal. La novela concluye con el rumor sordo pero indetenible de la huelga general que se avecina en las cordilleras.'
        }
      ],
      personajes: [
        { nombre: 'Servando Huanca', rol: 'Líder proletario', descripcion: 'Herrero de convicciones comunistas firmes que educa a los mineros en la conciencia de clase y organiza la insurrección sindical.' },
        { nombre: 'Mister Taik y Mister Weiss', rol: 'Gerentes de la Mining Society', descripcion: 'Ejecutivos estadounidenses que dirigen la explotación minera considerando a los indígenas como meros engranajes descartables.' },
        { nombre: 'Los hermanos Marino (José y Mateo)', rol: 'Comerciantes y contratistas', descripcion: 'Burgueses mestizos serviles al capital extranjero que lucran con el despojo de tierras y el monopolio del alcohol.' },
        { nombre: 'Graciela ("La Rosada")', rol: 'Víctima inocente', descripcion: 'Muchacha provinciana humilde ultrajada y asesinada en la orgía de las autoridades mineras.' },
        { nombre: 'Braulio Conchudos', rol: 'Indígena martirizado', descripcion: 'Campesino reclutado a la fuerza por la leva que muere apaleado por la policía en el camino a las minas.' }
      ],
      temasClave: [
        { titulo: 'El imperialismo extractivista', explicacion: 'La penetración del gran capital extranjero en alianza con las élites locales para succionar la riqueza mineral deshumanizando al trabajador.' },
        { titulo: 'La toma de conciencia de clase', explicacion: 'La transformación del dolor y la resignación indígena en organización política proletaria activa.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Novela social y proletaria de César Vallejo. Narra el despojo y la explotación salvaje de los indios Soras en el asiento minero de Quivilca por la empresa estadounidense Mining Society, que detona la resistencia comunista encabezada por Servando Huanca.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela proletaria' },
        { clave: 'Autor', valor: 'César Abraham Vallejo Mendoza' },
        { clave: 'Año de publicación', valor: '1931 (Madrid, Editorial Cenit)' },
        { clave: 'Escenario geográfico', valor: 'Asiento minero de Quivilca (Cuzco)' },
        { clave: 'Recurso mineral explotado', valor: 'Tungsteno (vital para blindajes bélicos)' }
      ],
      elementosClave: [
        { titulo: 'El martirio de la Rosada', contenido: 'Símbolo del ultraje absoluto que el poder económico ejerce sobre la vulnerabilidad del pueblo andino.' },
        { titulo: 'Los indios Soras', contenido: 'Comunidad en estado de inocencia natural que no comprende el dinero y es víctima del saqueo usurero.' },
        { titulo: 'Servando Huanca', contenido: 'Arquetipo del líder obrero consciente que canaliza la cólera popular hacia la lucha organizada.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Para qué utilizaba la empresa norteamericana el tungsteno extraído de Quivilca?',
          respuesta: 'Para abastecer a la industria bélica de Estados Unidos y sus aliados en el contexto de la Primera Guerra Mundial.'
        },
        {
          pregunta: '¿Qué acontecimiento precipita la rebelión de los trabajadores en la novela?',
          respuesta: 'El asesinato salvaje del recluta indígena Braulio Conchudos a manos de los gendarmes durante una marcha forzada.'
        }
      ]
    }
  },
  {
    id: 'trilce',
    titulo: 'Trilce',
    autor: 'César Vallejo',
    año: '1922',
    pais: 'Perú',
    genero: 'Lírico',
    especie: 'Poemario vanguardista',
    corriente: 'Vanguardismo poético universal',
    temaPrincipal: 'La orfandad existencial, el encarcelamiento injusto, la memoria materna sagrada y la fractura absoluta del lenguaje convencional.',
    portadaGradiente: 'linear-gradient(145deg, #172554 0%, #1e3a8a 50%, #030712 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'Publicado en Lima en 1922, Trilce es considerado el poemario más radical, innovador y deslumbrante de la lírica en lengua castellana del siglo XX. A lo largo de sus 77 poemas numerados en cifras romanas, Vallejo demuele la métrica, la ortografía y la sintaxis gramatical tradicional para crear un idioma poético virgen capaz de expresar el dolor del presidio en Trujillo, la nostalgia desgarradora por la madre muerta, la incomunicación amorosa y el misterio del cuerpo humano.',
      contextoHistorico: 'Gestado entre 1918 y 1922, durante los 112 días de reclusión injusta de Vallejo en la cárcel de Trujillo (1920-1921). Rompió con el modernismo rubendariano y superó a las vanguardias europeas (dadaísmo, futurismo) al dotar a la audacia verbal de un profundo contenido humano y doloroso.',
      analisisTrama: [
        {
          titulo: 'El neologismo del título y la propuesta estética',
          detalle: 'El título Trilce es una creación léxica del propio poeta, nacida de la fusión fonética y conceptual entre "tres" (el número cabalístico de la perfección y el sufrimiento) y "triste" (la tonalidad emocional dominante), a la que se suma la idea de "dulce". Frente a la retórica decorativa modernista, Vallejo adopta la dislocación léxica, crea verbos a partir de sustantivos ("albeando", "idolatrar"), usa términos científicos, números algebraicos y la desarticulación gráfica.'
        },
        {
          titulo: 'La experiencia del presidio trujillano (Poemas XVIII, LVIII y otros)',
          detalle: 'Vallejo pasó casi cuatro meses encerrado en la cárcel de Trujillo acusado falsamente de incendiar un bazar. En el célebre poema XVIII ("Oh las cuatro paredes de la celda / Ah las cuatro paredes albicantes / que sin remedio dan al mismo número"), el poeta recrea la asfixia espacial de los muros encalados que anulan el horizonte y transforman las extremidades del cuerpo en candados inertes. La prisión no es solo un calabozo físico, sino la metáfora de la existencia terrenal donde el ser humano nace encerrado sin saber su culpa.'
        },
        {
          titulo: 'El vacío de la madre muerta y el hogar de Santiago de Chuco (Poemas XXIII, XXVIII, LXV)',
          detalle: 'La muerte de su madre, doña María de los Santos Mendoza (fallecida en 1918), constituye el trauma afectivo cardinal del libro. En el poema XXVIII ("He almorzado solo ahora, y no he tenido madre, ni súplica, ni sírvete..."), el poeta siente el abismo de sentarse a una mesa ajena y fría sin la bendición materna. En el poema XXIII evoca el aroma de los bizcochos recién horneados por la madre que premiaban la inocencia infantil de los hermanos.'
        },
        {
          titulo: 'El absurdo de la numeración y el paso del tiempo (Poemas II, V, XXXVI)',
          detalle: 'Vallejo combate la tiranía del tiempo y la lógica matemática rígida. En el poema II reflexiona sobre la angustia del segundero: "¿Tiempo Tiempo Tiempo Tiempo?". En otros versos desarma la simetría lógica: "Rehuso, pues, haber más acá para mi amor / de mi sí mismo". El cuerpo se vuelve escenario de tensión entre el deseo erótico de Otis y la soledad más árida.'
        },
        {
          titulo: 'El lenguaje en carne viva: la estética del dolor humano',
          detalle: 'A diferencia de las vanguardias europeas que concebían la experimentación lingüística como un juego lúdico o un desafío formal, en Trilce la ruptura gramatical responde a una necesidad orgánica: las palabras viejas no sirven para expresar un dolor nuevo y sin fondo. Vallejo inventa términos ("amargoroso", "tumbos", "calostros"), quiebra la ortografía académica ("vusco", "herradura sin jinete") y devuelve al poema su condición de grito humano puro.'
        }
      ],
      personajes: [
        { nombre: 'La Voz Lírica (César Vallejo)', rol: 'Poeta sufriente', descripcion: 'Conciencia herida que experimenta la reclusión carcelaria, el desarraigo de la urbe y la soledad cósmica.' },
        { nombre: 'La Madre (Doña María de los Santos)', rol: 'Núcleo de ternura y plenitud', descripcion: 'Figura protectora idealizada cuya desaparición física deja al poeta en la orfandad absoluta.' },
        { nombre: 'Los Hermanos del hogar', rol: 'Compañeros de la infancia', descripcion: 'Evocados en los juegos de Santiago de Chuco como símbolos de la fraternidad perdida.' }
      ],
      temasClave: [
        { titulo: 'La orfandad y la desolación afectiva', explicacion: 'La pérdida de la madre y del hogar infantil convierte al mundo en un espacio frío donde el hombre se descubre desamparado.' },
        { titulo: 'La revolución lingüística radical', explicacion: 'Destrucción de la sintaxis clásica para reflejar las grietas de la condición humana moderna.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la vanguardia poética universal en lengua española. Conjunto de 77 poemas donde César Vallejo quiebra la lógica, la ortografía y la sintaxis tradicional para expresar el dolor del presidio, la ausencia de la madre y la soledad del hombre.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Lírico — Poemario de vanguardia' },
        { clave: 'Autor', valor: 'César Abraham Vallejo Mendoza' },
        { clave: 'Año de publicación', valor: '1922 (Talleres de la Penitenciaría de Lima)' },
        { clave: 'Composición formal', valor: '77 poemas titulados únicamente con números romanos (del I al LXXVII)' },
        { clave: 'Prólogo de la 1.ª edición', valor: 'Antenor Orrego' }
      ],
      elementosClave: [
        { titulo: 'Significado de Trilce', contenido: 'Palabra inventada que conjuga triste, tres y dulce.' },
        { titulo: 'Poema XVIII', contenido: 'Evocación de las cuatro paredes albicantes de la celda de la prisión de Trujillo.' },
        { titulo: 'Poema XXVIII', contenido: 'El almuerzo en soledad: dolor por la ausencia de la madre nutricia.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Qué experiencia biográfica del autor inspiró directamente los poemas carcelarios de Trilce?',
          respuesta: 'Su encierro injusto durante 112 días en la cárcel de Trujillo entre noviembre de 1920 y febrero de 1921.'
        },
        {
          pregunta: '¿Por qué Trilce marcó un antes y un después en la poesía castellana?',
          respuesta: 'Porque desmanteló totalmente los moldes métricos, ortográficos y gramaticales clásicos para inaugurar un lenguaje original fundado en la emoción y el dolor existencial.'
        }
      ]
    }
  },
  {
    id: 'los-heraldos-negros',
    titulo: 'Los heraldos negros',
    autor: 'César Vallejo',
    año: '1918 (publicado en 1919)',
    pais: 'Perú',
    genero: 'Lírico',
    especie: 'Poemario',
    corriente: 'Modernismo de transición hacia el Vanguardismo',
    temaPrincipal: 'El misterio insondable del sufrimiento humano, el desamparo cósmico ante Dios y la nostalgia hogareña andina.',
    portadaGradiente: 'linear-gradient(145deg, #27272a 0%, #3f3f46 50%, #18181b 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'Primer poemario de César Vallejo, publicado en Lima en 1919. Aunque conserva la métrica, la musicalidad y los colores de la escuela modernista de Rubén Darío y Julio Herrera y Reissig, introduce ya una voz hondamente personal, desgarrada y arraigada en el alma andina. Dividido en seis secciones temáticas encabezadas por el célebre poema liminar del mismo título, transita desde las interrogaciones metafísicas sobre el destino trágico del hombre hasta las entrañables escenas familiares en Santiago de Chuco y el duelo por la muerte de su hermano Miguel.',
      contextoHistorico: 'Editado en 1918 pero distribuido en 1919 a la espera de un prólogo que Abraham Valdelomar nunca llegó a redactar por su repentina muerte. Refleja la transición estética del Modernismo hacia una sensibilidad lírica humanizada y existencial.',
      analisisTrama: [
        {
          titulo: 'El poema liminar: "Los heraldos negros"',
          detalle: 'Abre el libro con uno de los versos más universales de la lírica hispanoamericana: "Hay golpes en la vida, tan fuertes... ¡Yo no sé!". El dolor no es fruto de un castigo explicable, sino una fuerza ciega e implacable: "Golpes como del odio de Dios; como si ante ellos, / la resaca de todo lo sufrido / se empozara en el alma... ¡Yo no sé!". Esos golpes son los heraldos negros que envía la muerte a anunciar la ruina del alma humana.'
        },
        {
          titulo: 'Estructura en seis secciones temáticas',
          detalle: 'El poemario se organiza formalmente en seis apartados: 1) Plafones ágiles (versos modernistas y simbolistas); 2) Buzos (inmersión en el abismo interior); 3) De la tierra (enraizamiento en el paisaje andino); 4) Nostalgias imperiales (homenaje al pasado incaico y la decadencia de la raza indígena); 5) Truenos (la rebelión y la duda teológica); y 6) Canciones de hogar (el santuario familiar).'
        },
        {
          titulo: 'La interrogación teológica y la duda de Dios ("Los dados eternos")',
          detalle: 'En el poema Los dados eternos, dedicado a Manuel González Prada, Vallejo interpela directamente a la divinidad: "Dios mío, estoy llorando el ser que vivo; / me pesa haber tomádote tu pan...". Vallejo presenta a un Dios humano y sufriente que juega a los dados sobre la tumba del universo: "Dios mío, y esta noche sorda, oscura, / ya no podrás jugar, porque la Tierra / es un dado roído y ya redondo / a fuerza de rodar a la aventura...".'
        },
        {
          titulo: 'La elegía fraternal: "A mi hermano Miguel"',
          detalle: 'En Canciones de hogar brilla la conmovedora elegía dedicada a su hermano muerto: "Hermano, hoy estoy en el poyo de la casa, / donde nos haces una falta sin fondo!". Recrea con infinita ternura el juego del escondite infantil: "Miguel, tú te escondiste una noche de agosto, / al alborear; pero, en vez de ocultarte riendo, estabas triste... No tardes en salir, hermano, que puede inquietarse mamá".'
        },
        {
          titulo: 'La nostalgia del mundo andino e indígena',
          detalle: 'En poemas como Idilio muerto ("Qué estará haciendo esta hora mi andina y dulce Rita / de junco y capulí..."), Vallejo contrapone la Lima brumosa, fría y aristocrática con la calidez luminosa de su tierra natal andina, forjando el arraigo telúrico que definirá toda su poética posterior.'
        }
      ],
      personajes: [
        { nombre: 'El Poeta (Yo lírico)', rol: 'Conciencia sufriente', descripcion: 'Hombre provinciano deslumbrado y herido por la soledad de la ciudad, conmovido ante el dolor de todos los seres.' },
        { nombre: 'El Hermano Miguel', rol: 'Compañero evocado', descripcion: 'Hermano predilecto fallecido en la juventud, inmortalizado a través del juego infantil del escondite.' },
        { nombre: 'La Amada Andina (Rita)', rol: 'Nostalgia campesina', descripcion: 'Símbolo del amor puro y sencillo enraizado en la provincia serrana.' }
      ],
      temasClave: [
        { titulo: 'El absurdo del sufrimiento humano', explicacion: 'El dolor que hiere al hombre no tiene justificación moral ni lógica; es un misterio cósmico ineludible.' },
        { titulo: 'La ternura del hogar andino', explicacion: 'La familia campesina y el recuerdo fraternal como único refugio frente a la hostilidad del mundo moderno.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Ópera prima lírica de César Vallejo. Obra de transición del Modernismo a la poesía humana universal, célebre por su poema liminar ("Hay golpes en la vida, tan fuertes... ¡Yo no sé!"), "Los dados eternos" y la elegía "A mi hermano Miguel".',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Lírico — Poemario' },
        { clave: 'Autor', valor: 'César Abraham Vallejo Mendoza' },
        { clave: 'Año de edición', valor: '1918 (distribuido formalmente en 1919)' },
        { clave: 'Estructura', valor: 'Poema liminar + 6 secciones temáticas (69 poemas en total)' },
        { clave: 'Influencia inicial', valor: 'Rubén Darío, Herrera y Reissig, Manuel González Prada' }
      ],
      elementsClave: [
        { titulo: 'Los golpes de la vida', contenido: 'Metáfora del dolor existencial que empoza el sufrimiento en el alma del hombre.' },
        { titulo: 'A mi hermano Miguel', contenido: 'La muerte asimilada poéticamente al juego infantil del escondite en el hogar paterno.' },
        { titulo: 'Los dados eternos', contenido: 'La Tierra como un dado desgastado que rueda al azar en las manos de un Dios que también sufre.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Con qué célebre verso inicia el poema "Los heraldos negros"?',
          respuesta: '"Hay golpes en la vida, tan fuertes... ¡Yo no sé!".'
        },
        {
          pregunta: '¿A quién está dedicado el poema "Los dados eternos"?',
          respuesta: 'Al maestro y pensador radical Manuel González Prada.'
        }
      ]
    }
  },
  {
    id: 'la-casa-de-carton',
    titulo: 'La casa de cartón',
    autor: 'Martín Adán (Rafael de la Fuente Benavides)',
    año: '1928',
    pais: 'Perú',
    genero: 'Narrativo / Lírico',
    especie: 'Novela corta lírica / Estampas poéticas',
    corriente: 'Vanguardismo Peruano (Prosa poética)',
    temaPrincipal: 'El despertar a la adolescencia, el balneario de Barranco en invierno y la mirada irónica sobre la burguesía y el paso del tiempo.',
    portadaGradiente: 'linear-gradient(145deg, #0f766e 0%, #14b8a6 50%, #042f2e 100%)',
    categoria: 'Literatura Peruana',
    resumenDetallado: {
      sinopsis: 'Escrita cuando el autor apenas tenía dieciséis años, La casa de cartón es la cumbre indiscutible de la prosa poética vanguardista en el Perú. Ambientada en el tradicional balneario limeño de Barranco durante los meses de invierno, la obra prescinde de un argumento narrativo lineal convencional para desplegar una sucesión de viñetas, retratos de muchachas (Catita, Lucha), reflexiones irónicas sobre los veraneantes, el tranvía, los cines y el recuerdo melancólico del amigo desaparecido Ramón.',
      contextoHistorico: 'Publicada en 1928 con prólogo consagratorio de Luis Alberto Sánchez y colofón entusiasta de José Carlos Mariátegui en la revista Amauta. Revolucionó la prosa hispanoamericana mediante el uso magistral de la metáfora sensorial, el lirismo puro y el humor desmitificador.',
      analisisTrama: [
        {
          titulo: 'El despertar invernal en Barranco y la arquitectura poética',
          detalle: 'Barranco en invierno despierta cubierto de neblina húmeda, malecones desiertos y casonas de madera con barandillas oxidadas. El narrador contempla la arquitectura balnearia como una frágil y encantadora "casa de cartón" que el viento y el tiempo podrían desmoronar. El mar bate contra los acantilados mientras el tranvía eléctrico rechina por las avenidas arboladas.'
        },
        {
          titulo: 'El recuerdo nostálgico del amigo Ramón',
          detalle: 'A lo largo de las estampas planea la sombra entrañable de Ramón, el amigo del colegio fallecido prematuramente. Ramón representa la mirada lúcida, la complicidad intelectual de las lecturas compartidas y la rebelión estética contra el mundo estéril de los adultos. El narrador le habla en confidencias sobre los amores imposibles y los cambios de la estación.'
        },
        {
          titulo: 'Galería de retratos femeninos: Catita, Lucha y las muchachas del balneario',
          detalle: 'Se suceden viñetas dedicadas a las jóvenes que pasean por el malecón. Catita, con su candor burgués y sus vestidos de verano; Lucha, y las muchachas gringas que acuden al colegio de monjas. La mirada del narrador oscila entre la fascinación lírica adolescente y una sutilísima ironía que desnuda la cursilería de las conversaciones sociales y los cortejos de la época.'
        },
        {
          titulo: 'El choque entre la modernidad cosmopolita y la tradición virreinal',
          detalle: 'El narrador describe con virtuosismo cromático la irrupción del cinematógrafo mudo, los automóviles que espantan a los perros callejeros y los discos fonográficos, conviviendo con los rezos vespertinos de las viejas beatas en las iglesias y los solterones que toman el té en las confiterías.'
        },
        {
          titulo: 'Epílogo lírico: la belleza efímera del mundo',
          detalle: 'La novela concluye sin desenlace cerrado ni moraleja didáctica: es la fijación plástica y verbal de un instante privilegiado de la juventud que se extingue. La prosa deslumbra por su densidad verbal, sus sinestesias insólitas ("el sol de los domingos sabe a chocolate") y su devoción estética absoluta.'
        }
      ],
      personajes: [
        { nombre: 'El Narrador (La mirada poética)', rol: 'Adolescente observador', descripcion: 'Joven hipersensible e irónico que recrea el mundo de Barranco a través de una prosa metafórica luminosa.' },
        { nombre: 'Ramón', rol: 'El amigo ausente', descripcion: 'Compañero de juventud cuya muerte prematura tiñe el relato de nostalgia y lucidez elegíaca.' },
        { nombre: 'Catita', rol: 'Muchacha del balneario', descripcion: 'Figura femenina idealizada y a la vez retratada con sutil parodia de las poses burguesas.' }
      ],
      temasClave: [
        { titulo: 'La prosa poética vanguardista', explicacion: 'La superación del realismo decimonónico en favor de la metáfora pura y el impresionismo visual.' },
        { titulo: 'La nostalgia del paraíso adolescente', explicacion: 'La vivencia de la juventud en un balneario marino antes de ingresar a la rutina hipócrita de la adultez.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Obra cumbre de la prosa vanguardista peruana escrita por un joven Martín Adán de dieciséis años. Retrata en estampas poéticas e irónicas la vida en el balneario de Barranco durante el invierno y la memoria del amigo Ramón.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo / Lírico — Novela lírica en estampas' },
        { clave: 'Autor', valor: 'Martín Adán (seudónimo de Rafael de la Fuente Benavides)' },
        { clave: 'Año de publicación', valor: '1928 (Lima)' },
        { clave: 'Escenario espacial', valor: 'Balneario de Barranco (Lima)' },
        { clave: 'Prologuistas célebres', valor: 'Luis Alberto Sánchez y José Carlos Mariátegui' }
      ],
      elementosClave: [
        { titulo: 'La casa de cartón como símbolo', contenido: 'Metáfora de la fragilidad, el ensueño y la fugacidad de las apariencias burguesas.' },
        { titulo: 'El personaje de Ramón', contenido: 'Presencia fantasmal que convoca la ternura, el duelo y el diálogo intelectual íntimo.' },
        { titulo: 'Sinestesias célebres', contenido: 'Fusión insólita de sensaciones: colores con sabores y sonidos con texturas materiales.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué La casa de cartón no posee una trama argumental convencional?',
          respuesta: 'Porque está concebida como una novela lírica vanguardista compuesta por viñetas impresionistas, donde predomina la riqueza sensorial del lenguaje sobre la anécdota lineal.'
        },
        {
          pregunta: '¿Qué balneario limeño sirve de marco a toda la obra?',
          respuesta: 'El balneario costero de Barranco durante los meses de invierno.'
        }
      ]
    }
  },
  {
    id: 'pedro-paramo',
    titulo: 'Pedro Páramo',
    autor: 'Juan Rulfo',
    año: '1955',
    pais: 'México',
    genero: 'Narrativo',
    especie: 'Novela breve',
    corriente: 'Realismo Mágico / Nueva Narrativa Hispanoamericana',
    temaPrincipal: 'El caciquismo despótico, la búsqueda infructuosa del padre y el purgatorio terrenal de un pueblo donde todos los habitantes están muertos.',
    portadaGradiente: 'linear-gradient(145deg, #451a03 0%, #78350f 50%, #1c1917 100%)',
    categoria: 'Literatura Hispanoamericana',
    resumenDetallado: {
      sinopsis: 'Cumpliendo la promesa hecha en su lecho de muerte a su madre Dolores Preciado, Juan Preciado llega al abrasador pueblo de Comala en busca de su padre, el poderoso terrateniente Pedro Páramo, "un rencor vivo". Acompañado por el misterioso arriero Abundio Martínez, se adentra en un pueblo desolado donde los susurros y ecos errantes le revelan una verdad aterradora: Comala está habitada únicamente por almas en pena. A través de saltos temporales fragmentarios, se reconstruye el ascenso y caída del cacique de la Media Luna, su amor obsesivo por Susana San Juan y su venganza despiadada que convirtió a Comala en un páramo estéril.',
      contextoHistorico: 'Publicada en México en 1955 por el Fondo de Cultura Económica. Considerada unánimemente una de las obras cumbres de la literatura en lengua española, admirada por Gabriel García Márquez y Jorge Luis Borges por su magistral estructura polifónica y su atmósfera espectral.',
      analisisTrama: [
        {
          titulo: 'El viaje a Comala y el encuentro con los muertos',
          detalle: 'Juan Preciado desciende a la caldera ardiente de Comala guiado por el arriero Abundio Martínez, quien le advierte que Pedro Páramo es también su padre. Al llegar a la casa de doña Eduviges Dyada, Juan descubre con sorpresa que la mujer lo esperaba porque su difunta madre se lo avisó. Pronto constata que Eduviges también está muerta y que su alma vaga penando por haberse suicidado. El pueblo entero es un laberinto de murmullos sepulcrales atrapados entre las paredes agrietadas.'
        },
        {
          titulo: 'La dominación despótica de la hacienda La Media Luna',
          detalle: 'Mediante continuos saltos al pasado, se narra la juventud y el ascenso de Pedro Páramo. Tras heredar la hacienda Media Luna arruinada por las deudas de su padre don Lucas Páramo, el joven Pedro recurre al engaño, la violencia armada y los asesinatos por encargo para adueñarse de todas las tierras del valle. Se casa por interés con Dolores Preciado solo para cancelar una deuda y arrebatarle sus parcelas, repudiándola poco después. Con la ayuda del capataz Fulgor Sedano y la complicidad cobarde del padre Rentería (sacerdote que perdona a los ricos porque vive de sus limosnas), Pedro Páramo se erige en dueño absoluto de vidas y haciendas.'
        },
        {
          titulo: 'La locura y el amor idealizado de Susana San Juan',
          detalle: 'En medio de su crueldad despiadada, Pedro Páramo conserva una sola debilidad humana: su amor apasionado y místico por Susana San Juan, compañera de su infancia. Hace asesinar al padre de Susana para traerla a vivir a la Media Luna. Sin embargo, Susana vive recluida en una locura serena provocada por el dolor de la muerte de su esposo Florencio; sueña despierta con el mar y rechaza el amor del cacique, consumiéndose lentamente hasta expirar en sus aposentos.'
        },
        {
          titulo: 'La venganza del cacique contra Comala: "Me cruzaré de brazos"',
          detalle: 'Al morir Susana San Juan, las campanas de la iglesia tañen a duelo. Sin embargo, los pueblos vecinos confunden el tañido con una fiesta y organizan ferias, rodeos y bailes populares en vez de guardar luto. Ofendido en lo más hondo de su orgullo, Pedro Páramo jura una venganza implacable: "Me cruzaré de brazos y Comala se morirá de hambre". El terrateniente clausura los sembríos, desmantela las faenas agrícolas y condena al pueblo a la miseria y la desolación hasta que todos perecen o emigran.'
        },
        {
          titulo: 'La muerte de Juan Preciado y el final de piedra del tirano',
          detalle: 'Abrumado por los murmullos de las almas que claman por oraciones para salir del purgatorio, Juan Preciado muere de asfixia y terror en la plaza pública. Es enterrado en una misma fosa común junto a Dorotea "La Cuarraca", continuando su diálogo bajo tierra. Finalmente, se relata la muerte de Pedro Páramo: anciano y solitario, es apuñalado por su propio hijo bastardo Abundio Martínez, quien borracho y enloquecido por la muerte de su esposa le pedía limosna para el entierro. Pedro Páramo contempla cómo se desmorona la Media Luna, da un golpe seco contra la tierra y "se desmoronó como si fuera un montón de piedras".'
        }
      ],
      personajes: [
        { nombre: 'Pedro Páramo', rol: 'Cacique omnipotente', descripcion: 'Tirano desalmado y vengativo de la Media Luna que encarna el feudalismo mexicano, redimido únicamente por su pasión por Susana.' },
        { nombre: 'Juan Preciado', rol: 'Buscador y víctima', descripcion: 'Hijo legítimo de Dolores que viaja en busca de su herencia y su identidad, hallando la muerte entre los murmullos de Comala.' },
        { nombre: 'Susana San Juan', rol: 'Amor inalcanzable', descripcion: 'Mujer etérea sumida en la locura y el duelo erótico, único ser al que el dinero y el poder del cacique no pudieron doblegar.' },
        { nombre: 'Padre Rentería', rol: 'Sacerdote culposo', descripcion: 'Párroco de Comala que absuelve los crímenes de los terratenientes por cobardía y niega el descanso a los pobres suicidas.' },
        { nombre: 'Abundio Martínez', rol: 'Hijo bastardo y parricida', descripcion: 'Arriero sordomudo que guía a Juan Preciado y termina asesinando a cuchilladas a su padre Pedro Páramo.' },
        { nombre: 'Dorotea ("La Cuarraca")', rol: 'Compañera de fosa', descripcion: 'Mendiga que acoge a Juan Preciado bajo la tierra y le cuenta los secretos íntimos de las almas sepultadas.' }
      ],
      temasClave: [
        { titulo: 'El caciquismo feudal mexicano', explicacion: 'La privatización del poder, la tierra y la justicia en manos de caudillos locales sin escrúpulos.' },
        { titulo: 'La frontera borrada entre vivos y muertos', explicacion: 'Comala como un purgatorio colectivo donde las culpas y remordimientos resuenan en un eterno presente.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Monumento de la narrativa mexicana y universal. Relata la llegada de Juan Preciado al pueblo desolado de Comala en busca de su padre Pedro Páramo, descubriendo que todos los habitantes están muertos y atrapados en sus culpas.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela' },
        { clave: 'Autor', valor: 'Juan Rulfo (Jalisco, México)' },
        { clave: 'Año de publicación', valor: '1955 (Fondo de Cultura Económica)' },
        { clave: 'Estructura temporal', valor: 'Fragmentaria, polifónica y acrónica (sin orden cronológico lineal)' },
        { clave: 'Frase inicial legendaria', valor: '"Vine a Comala porque me dijeron que acá vivía mi padre, un tal Pedro Páramo"' }
      ],
      elementosClave: [
        { titulo: 'Los murmullos de Comala', contenido: 'Título primitivo de la novela: Los murmullos, eco incesante de las almas que no pueden descansar en paz.' },
        { titulo: 'La muerte como montón de piedras', contenido: 'Pedro (piedra) Páramo (desierto): su cuerpo se disuelve materializando su propio nombre mineral.' },
        { titulo: 'La corrupción eclesiástica', contenido: 'El padre Rentería simboliza la claudicación moral de la Iglesia ante el dinero de los caciques.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿De qué muere Juan Preciado en Comala?',
          respuesta: 'Muere de asfixia y pánico provocado por los susurros incesantes de las almas en pena que invaden el pueblo desierto.'
        },
        {
          pregunta: '¿Por qué Pedro Páramo decidió destruir y dejar morir de hambre a Comala?',
          respuesta: 'Porque cuando falleció su amada Susana San Juan, los habitantes del pueblo no guardaron luto y se entregaron a fiestas y borracheras populares.'
        }
      ]
    }
  },
  {
    id: 'dona-barbara',
    titulo: 'Doña Bárbara',
    autor: 'Rómulo Gallegos',
    año: '1929',
    pais: 'Venezuela',
    genero: 'Narrativo',
    especie: 'Novela de la tierra / regionalista',
    corriente: 'Regionalismo Hispanoamericano',
    temaPrincipal: 'La dialéctica civilización versus barbarie: la lucha entre la ley moderna y la violencia montaraz en el llano venezolano.',
    portadaGradiente: 'linear-gradient(145deg, #7c2d12 0%, #b45309 50%, #431407 100%)',
    categoria: 'Literatura Hispanoamericana',
    resumenDetallado: {
      sinopsis: 'En los agrestes llanos del río Arauca, la despótica doña Bárbara ("La Dañera"), cacica de la hacienda El Miedo, domina la región mediante la brujería, el soborno a jueces corruptos y el despojo de tierras. Santos Luzardo, joven abogado educado en Caracas, regresa a su hacienda ancestral Altamira resuelto a venderla, pero al constatar el abandono y la barbarie reinante decide quedarse para imponer la ley, el cercado de linderos y la justicia civil. Rescata del salvajismo a Marisela, hija abandonada de Bárbara; doña Bárbara, seducida por la integridad de Santos, fracasa en sus hechizos y desaparece en los pantanos, consagrando la redención del llano.',
      contextoHistorico: 'Publicada en 1929 en Barcelona. Es la novela más representativa del regionalismo hispanoamericano y una alegoría política frontal contra la tiranía bárbara del dictador venezolano Juan Vicente Gómez.',
      analisisTrama: [
        {
          titulo: 'El retorno de Santos Luzardo y el reino de El Miedo (Primera Parte)',
          detalle: 'Santos Luzardo regresa al llano de Apure a bordo de un bongo por el río Arauca. Su hacienda Altamira, antaño próspera, se encuentra diezmada por el despojo sistemático de su vecina doña Bárbara, dueña de El Miedo. Bárbara fue en su juventud una muchacha inocente que sufrió una brutal violación múltiple por piratas de piragua que asesinaron a su primer amor Asdrúbal; ese trauma forjó su odio implacable contra los hombres y su afán desmedido de dominación a través de pactos supersticiosos con "El Socio" y el apoyo de secuaces como Balbino Paiba y el coronel Ño Pernalete.'
        },
        {
          titulo: 'El rescate y civilización de Marisela (Segunda Parte)',
          detalle: 'Santos descubre viviendo en la choza miserable del alcohólico Lorenzo Barquero (antiguo amante arruinado de Bárbara) a Marisela, una adolescente hermosa pero abandonada en estado salvaje, sucia y analfabeta. Santos la traslada a Altamira junto a su padre: le enseña a asearse, vestirse, hablar con corrección moral y leer, operando en la joven una deslumbrante metamorfosis que despierta entre ambos un amor puro y regenerador.'
        },
        {
          titulo: 'La batalla jurídica y el cerco de la justicia',
          detalle: 'Frente a las trampas de doña Bárbara, Santos rehúsa inicialmente la violencia armada y utiliza el derecho: cerca los linderos de Altamira para terminar con el robo de ganado (la "cimarronera"), denuncia a los jueces comprados y desafía la prepotencia del jefe civil Pernalete. Doña Bárbara queda desconcertada: ningún hombre la había resistido con la fuerza tranquila de la ley. La cacica se enamora secretamente de Santos y ordena moderar sus ataques, provocando la desconfianza de sus antiguos cómplices como Mr. Danger, un codicioso cazador estadounidense.'
        },
        {
          titulo: 'El crimen de los peones y la tentación de la barbarie',
          detalle: 'La tensión estalla cuando los esbirros de Bárbara asesinan al fiel peón de Santos, Carmelito López, para robar las plumas de garza que llevaba a vender. Santos experimenta una crisis moral terrible: siente que el llano exige responder con sangre y venganza salvaje ("¡Centauro de nuevo!"). Sin embargo, la oportuna intervención afectiva de Marisela y el esclarecimiento del crimen evitan que Santos se degrade en asesino.'
        },
        {
          titulo: 'La renuncia final de la cacica y la redención del Arauca (Tercera Parte)',
          detalle: 'Doña Bárbara acude armada a Altamira con la intención de matar a Marisela por haberle robado el amor de Santos. Oculta tras las ramas, contempla la inocencia y belleza de su propia hija junto a Santos; conmovida por un súbito despertar de instinto maternal, guarda el revólver y renuncia a su odio. Regresa a El Miedo, redacta un testamento legando todas sus inmensas tierras y haciendas a su hija Marisela, y se interna en la soledad de los tremedales del Arauca para no volver jamás. Santos y Marisela contraen matrimonio unificando Altamira y El Miedo, consagrando la victoria de la civilización y la libertad sobre la barbarie.'
        }
      ],
      personajes: [
        { nombre: 'Santos Luzardo', rol: 'Civilización y Derecho', descripcion: 'Abogado caraqueño ilustrado que personifica la educación, el progreso moderno y la legalidad frente al despotismo.' },
        { nombre: 'Doña Bárbara ("La Dañera")', rol: 'Barbarie y Tiranía', descripcion: 'Mujer bravía y sensual marcada por el rencor, dominadora de hombres y fuerzas ocultas, símbolo del atraso feudal.' },
        { nombre: 'Marisela', rol: 'Naturaleza redimible', descripcion: 'Hija abandonada de Bárbara que pasa del salvajismo a la gracia civilizada mediante el amor y la educación de Santos.' },
        { nombre: 'Lorenzo Barquero', rol: 'La ruina del intelectual', descripcion: 'Hombre talentoso destruido por el alcohol y el despojo de Bárbara, advertencia viviente de la derrota moral.' },
        { nombre: 'Mr. Danger', rol: 'Imperialismo rapaz', descripcion: 'Norteamericano aventurero y cínico que desprecia a los llaneros y busca lucrar con la decadencia de la región.' }
      ],
      temasClave: [
        { titulo: 'Civilización contra Barbarie', explicacion: 'La tesis sarmientina aplicada a Venezuela: solo la educación moral y la ley moderna pueden someter el atraso de la tiranía.' },
        { titulo: 'La regeneración del llano', explicacion: 'El matrimonio final entre Santos y Marisela sella la integración fecunda entre la fuerza virgen de la tierra y la luz de la razón.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Monumento del regionalismo hispanoamericano. Alegoría de la pugna entre la Civilización (Santos Luzardo) y la Barbarie (Doña Bárbara) en los llanos de Apure, resuelta con la educación de Marisela y la desaparición de la cacica despótica.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela regionalista' },
        { clave: 'Autor', valor: 'Rómulo Gallegos Freire (Caracas, Venezuela)' },
        { clave: 'Año de publicación', valor: '1929' },
        { clave: 'Escenario geográfico', valor: 'Los llanos del río Arauca (Apure)' },
        { clave: 'Nombres simbólicos', valor: 'Hacienda Altamira (altura moral) vs. El Miedo (terror feudal)' }
      ],
      elementosClave: [
        { titulo: 'El trauma de Asdrúbal', contenido: 'El asesinato de su prometido y la violación en la piragua explican el resentimiento y el desprecio de Bárbara hacia los hombres.' },
        { titulo: 'La doma de la yegua', contenido: 'Metáfora central: Santos doma una fiera cerrera demostrando que domina el medio llanero sin perder su cultura civilizada.' },
        { titulo: 'El Socio', contenido: 'Entidad espiritual o diabólica a la que Bárbara consulta sus decisiones en el corral de El Miedo.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Cuál es el destino final de Doña Bárbara al término de la novela?',
          respuesta: 'Desiste de asesinar a su hija Marisela, le hereda formalmente todas sus tierras y haciendas y se marcha solitaria perdiéndose en los pantanos y tremedales del río Arauca.'
        },
        {
          pregunta: '¿Qué representa la transformación física y moral de Marisela?',
          respuesta: 'Simboliza la capacidad de la naturaleza americana salvaje de ser redimida y florecer en belleza cuando es educada por la justicia y el amor civilizador.'
        }
      ]
    }
  },
  {
    id: 'el-senor-presidente',
    titulo: 'El señor Presidente',
    autor: 'Miguel Ángel Asturias',
    año: '1946',
    pais: 'Guatemala',
    genero: 'Narrativo',
    especie: 'Novela de dictador',
    corriente: 'Vanguardismo / Realismo Mágico / Novela del Dictador',
    temaPrincipal: 'El terror sistemático, la paranoia colectiva y la degradación moral bajo una dictadura militar absolutista latinoamericana.',
    portadaGradiente: 'linear-gradient(145deg, #18181b 0%, #27272a 50%, #09090b 100%)',
    categoria: 'Literatura Hispanoamericana',
    resumenDetallado: {
      sinopsis: 'En una innombrada república centroamericana asfixiada por el terror policíaco, el coronel José Parrales Sonriente, esbirro predilecto del tirano, es asesinado en el portal de la catedral por el idiota Pelele tras una burla involuntaria. El Señor Presidente aprovecha el crimen para inculpar falsamente a sus enemigos políticos: el general Eusebio Canales y el licenciado Carvajal. Miguel Cara de Ángel, confidente predilecto del dictador, recibe la misión de ayudar a fugar a Canales para fingir culpabilidad; sin embargo, Cara de Ángel se enamora apasionadamente de Camila Canales, hija del general perseguido. La traición del régimen conduce a Cara de Ángel a una prisión subterránea donde muere torturado por la mentira, mientras la tiranía prosigue inmutable.',
      contextoHistorico: 'Inspirada en la sanguinaria dictadura de Manuel Estrada Cabrera en Guatemala (1898-1920). Ganadora del Premio Nobel de Literatura en 1967. Obra cumbre de la novela de dictador que fusiona la prosa lírica surrealista con la denuncia política de la opresión.',
      analisisTrama: [
        {
          titulo: 'El Portal del Señor y el asesinato del coronel Parrales (Parte I)',
          detalle: 'La novela abre con un deslumbrante retablo onírico y sonoro: "¡Alumbra, lumbre de alumbre, Papatrigo...!". En el Portal del Señor pernoctan mendigos harapientos. Entre ellos deambula el Pelele, un idiota que sufre ataques de pánico cuando alguien menciona la palabra "madre". El cruel coronel José Parrales Sonriente le grita en son de burla: "¡Tu madre!"; el Pelele estalla en una crisis de furia ciega, se arroja sobre el militar y lo desgarra a dentelladas y golpes matándolo en el acto. El idiota huye ensangrentado por los callejones de la ciudad.'
        },
        {
          titulo: 'La infamia del régimen y la conspiración palaciega',
          detalle: 'La policía secreta tortura a los mendigos en el calabozo para que firmen declaraciones falsas acusando del crimen al general retirado Eusebio Canales y al jurista independiente Carvajal, dos ciudadanos respetados a quienes el Señor Presidente desea exterminar. El Presidente llama a su despacho a su hombre de mayor confianza, el joven y apuesto Miguel Ángel Face ("Cara de Ángel, bello y malo como Satán"), y le encarga una misión ambigua: advertir a Canales para que huya de noche, simulando así una fuga culpable que justifique su condena por traición a la patria.'
        },
        {
          titulo: 'El rescate de Camila y la metamorfosis de Cara de Ángel (Parte II)',
          detalle: 'Cara de Ángel cumple la orden y ayuda a escapar al general Canales a través de las montañas hacia la frontera. En la casa allanada queda abandonada Camila, la joven y pura hija del general. Desesperado por salvarla del acoso de los militares, Cara de Ángel busca refugio entre los parientes de la muchacha, pero todos le cierran las puertas aterrorizados por el miedo a caer en desgracia ante el régimen. Cara de Ángel aloja a Camila en una fonda y cuida de ella con ternura desinteresada cuando cae gravemente enferma de pulmonía. El amor hacia Camila opera en Cara de Ángel un renacer ético: el siervo del demonio presidencial descubre la belleza del bien y la compasión.'
        },
        {
          titulo: 'El fusilamiento del inocente Carvajal y la rebelión de Canales',
          detalle: 'Mientras tanto, el aparato represivo ejecuta su farsa: el licenciado Carvajal es sometido a un consejo de guerra sumarísimo sin pruebas y fusilado en los patios de la penitenciaría; su esposa deambula en vano implorando clemencia por las antesalas presidenciales. En la frontera, el general Canales logra organizar un ejército guerrillero de patriotas para derrocar al tirano; sin embargo, al enterarse por un periódico falso de que su hija Camila se ha casado con el favorito del Presidente, sufre un fulminante paro cardíaco provocado por el engaño y muere antes de iniciar la campaña.'
        },
        {
          titulo: 'La trampa del tren, la celda subterránea y el triunfo de la infamia (Parte III)',
          detalle: 'Cara de Ángel contrae matrimonio legítimo con Camila. El Presidente, fingiendo complacencia, lo convoca a palacio, lo nombra embajador en Suiza y le ordena partir en el tren hacia el puerto. En la estación marítima, agentes de la policía secreta secuestran a Cara de Ángel, muelen a palos su cuerpo y lo encierran en una celda subterránea inmunda donde no penetra un rayo de sol. Para atormentar su alma, los guardias introducen a un reo cómplice que le asegura falsamente que Camila se ha convertido en la nueva amante predilecta del Señor Presidente. Consumido por el dolor moral, el tifus y la desesperanza, Cara de Ángel muere en el lodo. Camila, exiliada en el campo con su pequeño hijo, ignora la suerte de su esposo, mientras las campanas de la catedral tocan a misa en honor al eterno Señor Presidente.'
        }
      ],
      personajes: [
        { nombre: 'El Señor Presidente', rol: 'Dictador omnipresente', descripcion: 'Soberano frío, paranoico e invisible que maneja las vidas de todos los ciudadanos mediante el miedo, el chantaje y la delación.' },
        { nombre: 'Miguel Cara de Ángel', rol: 'Favorito y trágico converso', descripcion: 'Intelectual refinado al servicio del mal que se redime por el amor a Camila, sufriendo la venganza destructiva del déspota.' },
        { nombre: 'Camila Canales', rol: 'Víctima y pureza', descripcion: 'Hija del general Canales cuya bondad transforma el corazón de Cara de Ángel, condenada al aislamiento campestre.' },
        { nombre: 'El Pelele', rol: 'Idiota del portal', descripcion: 'Miserable perturbado cuyo arranque animal desata involuntariamente la maquinaria asesina de la tiranía.' },
        { nombre: 'General Eusebio Canales', rol: 'Militar opositor', descripcion: 'Oficial de honor que huye a la frontera para liderar la revolución armada contra el régimen.' }
      ],
      temasClave: [
        { titulo: 'La tiranía como corrupción ontológica', explicacion: 'La dictadura no solo viola derechos civiles: envilece el alma de los gobernados convirtiendo a hermanos y amigos en delatores.' },
        { titulo: 'El lenguaje del esperpento y el mito', explicacion: 'Fusión de la vanguardia expresionista con la mitología maya para retratar al dictador como un dios oscuro y sangriento.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Obra cumbre de la novela del dictador latinoamericana y del Premio Nobel Miguel Ángel Asturias. Retrata la atmósfera de terror y delación de una tiranía centroamericana tras el asesinato fortuito de un coronel a manos del Pelele.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela del dictador' },
        { clave: 'Autor', valor: 'Miguel Ángel Asturias (Guatemala)' },
        { clave: 'Año de publicación', valor: '1946 (México)' },
        { clave: 'Premio obtenido', valor: 'Premio Nobel de Literatura 1967' },
        { clave: 'Referente histórico', valor: 'Dictadura de Manuel Estrada Cabrera (1898-1920)' }
      ],
      elementosClave: [
        { titulo: 'El inicio fónico vanguardista', contenido: '"¡Alumbra, lumbre de alumbre, Papatrigo...", onomatopeya y juego sonoro que evoca el despertar del portal.' },
        { titulo: 'La celda subterránea', contenido: 'Símbolo del olvido y la anulación del ser humano en los calabozos secretos del régimen.' },
        { titulo: 'La tortura psicológica', contenido: 'Hacer creer a Cara de Ángel que su esposa Camila es la concubina del tirano para que muera sin esperanza.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Quién asesina al coronel Parrales Sonriente al inicio de la novela?',
          respuesta: 'El Pelele, un mendigo idiota que sufre un ataque de histeria homicida cuando el coronel se burla de su madre difunta.'
        },
        {
          pregunta: '¿Qué le ocurre finalmente a Miguel Cara de Ángel tras ser apresado en el puerto?',
          respuesta: 'Es recluido en una prisión subterránea y muere enloquecido por la falsa creencia de que Camila se convirtió en amante del Presidente.'
        }
      ]
    }
  },
  {
    id: 'la-voragine',
    titulo: 'La vorágine',
    autor: 'José Eustasio Rivera',
    año: '1924',
    pais: 'Colombia',
    genero: 'Narrativo',
    especie: 'Novela de la selva / regionalista',
    corriente: 'Regionalismo Hispanoamericano',
    temaPrincipal: 'La voracidad devoradora de la selva amazónica y la denuncia de la esclavitud indígena en la explotación salvaje del caucho.',
    portadaGradiente: 'linear-gradient(145deg, #052e16 0%, #166534 50%, #022c22 100%)',
    categoria: 'Literatura Hispanoamericana',
    resumenDetallado: {
      sinopsis: 'El poeta romántico y rebelde Arturo Cova huye de Bogotá hacia los llanos del Casanare con su amante Alicia para escapar de las presiones sociales y judiciales. En el llano conviven en el hato de La Maporita, pero la traición del hacendado Narciso Barrera, quien secuestra a Alicia y seduce a los peones con falsas promesas de riqueza para llevarlos a las caucherías de la selva amazónica, empuja a Cova a una frenética persecución. Al adentrarse en la selva del río Vichada y el Vaupés, Cova descubre el infierno verde: la esclavitud genocida de los indígenas por la Casa Arana, las fiebres, las hormigas carnívoras y la selva como una deidad monstruosa que termina devorando a los hombres sin dejar rastro.',
      contextoHistorico: 'Publicada en 1924 en Bogotá. Rivera conoció personalmente la tragedia como miembro de la Comisión Limítrofe colombo-venezolana, redactando la novela como un testimonio fidedigno de denuncia internacional contra el genocidio cauchero.',
      analisisTrama: [
        {
          titulo: 'La fuga a los llanos y el fuego de La Maporita (Primera Parte)',
          detalle: 'Arturo Cova abre su manuscrito con una confesión tempestuosa: "Antes que me hubiera apasionado por mujer alguna, jugué mi corazón al azar y me lo ganó la Violencia...". Huye con Alicia de la moral hipócrita de Bogotá a las sabanas ardientes del Casanare. Se instalan en el hato ganadero La Maporita de Franco Silva. Allí aparece Narciso Barrera, agente corrupto de las empresas caucheras que embriaga a los peones, enamora a las mujeres y provoca el incendio intencional del hato, secuestrando a Alicia y a Griselda rumbo a las profundidades de la selva.'
        },
        {
          titulo: 'La entrada al infierno verde y el relato de Clemente Silva (Segunda Parte)',
          detalle: 'Cova, Franco y unos peones montan a caballo y se internan en la selva en persecución de los fugitivos. Pronto la naturaleza exuberante se revela como una prisión vegetal claustrofóbica: mosquitos, fiebres palúdicas, ciénagas putrefactas y árboles gigantes que bloquean la luz solar. En las orillas del río encuentran al viejo Clemente Silva, un cauchero veterano que busca los huesos de su hijo Luciano por los bosques. Don Clemente relata el espanto de las barracas caucheras: indígenas y peones colombianos y peruanos azotados hasta el desollamiento, mutilados con machetes y colgados de los árboles si no cumplen la cuota de látex exigida por los capataces.'
        },
        {
          titulo: 'El emporio de la Casa Arana y la explotación indígena',
          detalle: 'Se denuncia con nombres propios los horrores de las compañías explotadoras (como la Peruvian Amazon Company / Casa Arana). Cova presencia la degradación moral de los capataces (el Funes, el Pezil), quienes asesinan a sangre fría a centenares de indígenas huitotos y boras por simple diversión alcohólica. Los ríos están colmados de cadáveres flotantes y las tribus enteras son extinguidas por la sífilis y el trabajo esclavo.'
        },
        {
          titulo: 'El reencuentro con Alicia y el castigo de Narciso Barrera (Tercera Parte)',
          detalle: 'Tras meses de delirio febril donde la selva quiebra la mente poética de Cova, los expedicionarios localizan la barraca de Yabiteros donde se oculta Narciso Barrera con Alicia. Barrera es ajusticiado: arrojado a las aguas del río donde los peces carnívoros (caribes / pirañas) devoran su carne viva en minutos. Cova recupera a Alicia, quien ha dado a luz a un niño sietemesino enfermo y desnutrido.'
        },
        {
          titulo: 'El epílogo desolador: ¡Los devoró la selva!',
          detalle: 'Buscando escapar de las epidemias y las partidas de bandoleros, Cova, Alicia, el niño y sus camaradas se internan en un bosque tupido intentando alcanzar la frontera venezolana. Las semanas pasan sin que nadie tenga noticias de ellos. El diplomático consular redacta un cablegrama oficial de búsqueda que cierra el libro con una de las frases más célebres de la literatura hispana: "Ni rastro de ellos. ¡Los devoró la selva!".'
        }
      ],
      personajes: [
        { nombre: 'Arturo Cova', rol: 'Protagonista y narrador', descripcion: 'Poeta bogotano impulsivo, celoso y apasionado cuya mente idealista se desintegra ante la brutalidad del infierno verde.' },
        { nombre: 'Alicia', rol: 'Compañera de fuga', descripcion: 'Joven de la sociedad capitalina que soporta el secuestro y las fiebres de la selva para salvar a su hijo.' },
        { nombre: 'Clemente Silva', rol: 'Voz testimonial del cauchero', descripcion: 'Anciano buscador de los restos de su hijo que encarna el martirio y la resistencia moral de los esclavos del caucho.' },
        { nombre: 'Narciso Barrera', rol: 'Antagonista despiadado', descripcion: 'Agente y traficante de carne humana que utiliza el engaño y el endeudamiento forzado para alimentar los campamentos mineros y caucheros.' }
      ],
      temasClave: [
        { titulo: 'La naturaleza como monstruo antropófago', explicacion: 'La selva amazónica no es un paisaje idílico bucólico, sino una fuerza viva implacable que enloquece y traga a los invasores humanos.' },
        { titulo: 'La denuncia del genocidio del caucho', explicacion: 'La primera gran novela de testimonio documental que desnudó ante el mundo los crímenes de las multinacionales caucheras.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Novela cumbre de la selva hispanoamericana. Narra la huida del poeta Arturo Cova y su amante Alicia hacia los llanos y la Amazonía, donde descubre la barbarie del genocidio cauchero hasta ser devorados por la selva.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela de la selva' },
        { clave: 'Autor', valor: 'José Eustasio Rivera (Neiva, Colombia)' },
        { clave: 'Año de publicación', valor: '1924 (Bogotá)' },
        { clave: 'Escenarios geográficos', valor: 'Llanos del Casanare y selvas del Vichada, Guainía y Amazonas' },
        { clave: 'Telegrama de cierre', valor: '"Ni rastro de ellos. ¡Los devoró la selva!"' }
      ],
      elementosClave: [
        { titulo: 'Frase inicial icónica', contenido: '"Antes que me hubiera apasionado por mujer alguna, jugué mi corazón al azar y me lo ganó la Violencia...".' },
        { titulo: 'Clemente Silva', contenido: 'Personaje histórico ficcionalizado que documenta las atrocidades de la Casa Arana contra los indígenas.' },
        { titulo: 'La muerte de Barrera', contenido: 'Arrojado al río y devorado por cardúmenes de caribes (pirañas).' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Cuál es el motor inicial que empuja a Arturo Cova a abandonar Bogotá?',
          respuesta: 'La fuga amorosa con Alicia para escapar de un matrimonio forzado y de las órdenes de captura impuestas por los parientes ricos de la joven.'
        },
        {
          pregunta: '¿Qué revela el mensaje telegráfico final del cónsul?',
          respuesta: 'Que Arturo Cova y sus compañeros desaparecieron definitivamente en las profundidades vegetales sin dejar rastro: "¡Los devoró la selva!".'
        }
      ]
    }
  },
  {
    id: 'rayuela',
    titulo: 'Rayuela',
    autor: 'Julio Cortázar',
    año: '1963',
    pais: 'Argentina',
    genero: 'Narrativo',
    especie: 'Antinovela / Contranovela',
    corriente: 'Boom Latinoamericano (Vanguardismo narrativo)',
    temaPrincipal: 'La búsqueda ontológica del sentido de la existencia (el kibutz del deseo), el amor bohemio y la ruptura lúdica de la estructura del libro.',
    portadaGradiente: 'linear-gradient(145deg, #4338ca 0%, #6366f1 50%, #312e81 100%)',
    categoria: 'Literatura Hispanoamericana',
    resumenDetallado: {
      sinopsis: 'Rayuela es la contranovela más revolucionaria y lúdica del Boom Hispanoamericano. Desafía la lectura lineal pasiva mediante un famoso "Tablero de dirección" que propone múltiples formas de leer el libro: desde la secuencia tradicional de los capítulos 1 al 56 (prescindiendo del resto) hasta una lectura saltarina en zig-zag que incorpora los capítulos prescindibles. Narra en París la vida bohemia de Horacio Oliveira, un intelectual argentino que deambula buscando a La Maga (Lucía) entre jazz, discusiones del Club de la Serpiente y el dolor por la muerte del bebé Rocamadour; y luego en Buenos Aires, su amistad con Traveler y Talita entre un circo y un manicomio.',
      contextoHistorico: 'Publicada en 1963 en Buenos Aires (Editorial Sudamericana). Rompió las convenciones del lector pasivo ("lector-hembra" en el léxico de la época, redefinido hoy como lector receptivo) exigiendo un "lector cómplice" activo que arme el texto a su propio criterio.',
      analisisTrama: [
        {
          titulo: 'El Tablero de dirección y la estructura en tres partes',
          detalle: 'La obra se divide en tres secciones: 1) Del lado de allá (capítulos 1 al 36, ambientada en París); 2) Del lado de acá (capítulos 37 al 56, ambientada en Buenos Aires); y 3) De otros lados (capítulos 57 al 155, "capítulos prescindibles" con notas teóricas del escritor ficticio Morelli, recortes de periódico y reflexiones existenciales). El lector puede seguir el orden numérico o saltar según el tablero propuesto: 73 - 1 - 2 - 116...'
        },
        {
          titulo: '"Del lado de allá": El amor con La Maga y el Club de la Serpiente en París',
          detalle: 'Horacio Oliveira deambula por los puentes del Sena buscando a La Maga ("¿Encontraría a La Maga? Tantas veces me había bastado asomarme..."). La Maga es intuitiva, espontánea y poética, mientras Oliveira es hiperintelectual y prisionero del análisis racional. Se reúnen en buhardillas con el Club de la Serpiente (Gregorovius, Ronald, Babs, Wong) para escuchar discos de jazz clásico y discutir sobre filosofía, pintura y literatura hasta el alba.'
        },
        {
          titulo: 'La muerte de Rocamadour y la ruptura definitiva (Capítulo 28)',
          detalle: 'El punto de quiebre dramático ocurre en la oscura buhardilla: mientras el Club discute apasionadamente sobre abstracciones filosóficas, el bebé de La Maga, Rocamadour, muere en su cuna víctima de una neumonía desatendida. Oliveira descubre el cadáver pero calla cobardemente para no interrumpir el debate; cuando La Maga toca el cuerpecito frío estalla el dolor desgarrador. Tras el funeral, La Maga desaparece sin dejar rastro y Oliveira, sumido en la culpa y la indigencia, es deportado a la Argentina tras ser detenido con una indigente en los muelles del Sena.'
        },
        {
          titulo: '"Del lado de acá": El reencuentro en Buenos Aires con Traveler y Talita',
          detalle: 'En Buenos Aires, Horacio se reencuentra con su viejo amigo Manolo Traveler (su "doble" o alter ego) y su esposa Talita, en quien Oliveira proyecta obsesivamente la imagen de la perdida Maga. Trabajan primero en un circo callejero y luego compran un manicomio. En el hospital psiquiátrico, Horacio pasa las noches en vela jugando al ajedrez y vigilando los pasillos.'
        },
        {
          titulo: 'El puente de tablones entre las ventanas y el salto en la rayuela',
          detalle: 'Célebre escena donde Traveler y Oliveira tienden unos tablones inestables entre las ventanas de sus habitaciones para cruzar un paquete de yerba mate sobre el abismo del callejón. En el desenlace, Horacio se atrinchera en su habitación del manicomio colocando piolines e hilachas defensivas; desde la ventana del segundo piso contempla el dibujo infantil de una rayuela trazado con tiza en el patio ("la casilla del Cielo"). Mirando hacia abajo donde Traveler y Talita lo llaman con angustia, Horacio sonríe con serenidad y se inclina hacia el vacío, dejando abierto su destino final en un salto hacia la libertad.'
        }
      ],
      personajes: [
        { nombre: 'Horacio Oliveira', rol: 'Protagonista buscador', descripcion: 'Intelectual argentino escéptico que busca una verdad absoluta sin dejarse atrapar por los dogmas burgueses.' },
        { nombre: 'La Maga (Lucía)', rol: 'Intuición y pureza', descripcion: 'Uruguaya tierna y desordenada que vive en la poesía natural sin necesidad de comprenderla intelectualmente.' },
        { nombre: 'Manolo Traveler', rol: 'El doble bonaerense', descripcion: 'Amigo fraternal de Horacio; irónicamente apodado Traveler aunque nunca ha salido de la Argentina.' },
        { nombre: 'Talita', rol: 'Espejo de La Maga', descripcion: 'Esposa inteligente de Traveler sobre la cual Horacio transfiere su nostalgia por el amor perdido.' },
        { nombre: 'Morelli', rol: 'Teórico de la antinovela', descripcion: 'Anciano escritor hospitalizado en París que formula las teorías estéticas de la fragmentación que componen Rayuela.' }
      ],
      temasClave: [
        { titulo: 'La teoría del lector cómplice', explicacion: 'La literatura como un juego interactivo donde el lector decide su propio itinerario y cuestiona la pasividad del consumo cultural.' },
        { titulo: 'La rayuela como metáfora ontológica', explicacion: 'El juego infantil de la rayuela representa el ascenso difícil del Hombre desde la Tierra hasta alcanzar la casilla del Cielo.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Contranovela revolucionaria de Julio Cortázar. Propone una lectura interactiva mediante un tablero de dirección que une las andanzas bohemias de Horacio Oliveira y La Maga en París con su regreso a Buenos Aires junto a Traveler y Talita.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Contranovela / Antinovela' },
        { clave: 'Autor', valor: 'Julio Florencio Cortázar (Bruselas / Buenos Aires)' },
        { clave: 'Año de publicación', valor: '1963 (Editorial Sudamericana)' },
        { clave: 'Formas de lectura sugeridas', valor: '1) Tradicional (cap. 1 al 56); 2) Saltarina del tablero (cap. 73 al 155)' },
        { clave: 'Frase inicial', valor: '"¿Encontraría a La Maga?"' }
      ],
      elementosClave: [
        { titulo: 'El Club de la Serpiente', contenido: 'Grupo de intelectuales marginados que escuchan jazz en París discutiendo de arte y metafísica.' },
        { titulo: 'La muerte de Rocamadour', contenido: 'Suceso trágico del capítulo 28 que dinamita la relación entre Horacio y La Maga.' },
        { titulo: 'Las morellianas', contenido: 'Capítulos reflexivos donde Morelli expone las bases teóricas de la novela desestructurada.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Cuáles son las dos ciudades donde transcurre la trama de Rayuela?',
          respuesta: 'París ("Del lado de allá", capítulos 1 al 36) y Buenos Aires ("Del lado de acá", capítulos 37 al 56).'
        },
        {
          pregunta: '¿Qué innovación fundamental introdujo Cortázar respecto a la participación del lector?',
          respuesta: 'La creación de un "lector cómplice" que rechaza la lectura pasiva y participa activamente eligiendo el orden de los capítulos a través del tablero de dirección.'
        }
      ]
    }
  },
  {
    id: 'el-tunel',
    titulo: 'El túnel',
    autor: 'Ernesto Sábato',
    año: '1948',
    pais: 'Argentina',
    genero: 'Narrativo',
    especie: 'Novela corta psicológica y existencialista',
    corriente: 'Existencialismo Hispanoamericano',
    temaPrincipal: 'La incomunicación absoluta, los celos obsesivos enfermizos y la soledad insondable del alma humana.',
    portadaGradiente: 'linear-gradient(145deg, #1e1b4b 0%, #312e81 50%, #0f172a 100%)',
    categoria: 'Literatura Hispanoamericana',
    resumenDetallado: {
      sinopsis: 'Desde su celda en un psiquiátrico criminal, el pintor Juan Pablo Castel confiesa con frialdad matemática cómo y por qué asesinó a la única persona que logró comprenderlo: María Iribarne. Castel queda fascinado al ver a una muchacha desconocida contemplar detenidamente en su cuadro Maternidad una pequeña ventana superior que mira a una playa solitaria. Obsesionado con hallarla, entabla relación con ella solo para descubrir que está casada con el ciego Allende y que mantiene un vínculo ambiguo con su primo Hunter en la estancia de descanso. La paranoia, los interrogatorios asfixiantes y los celos destructivos empujan a Castel a apuñalar a María en su lecho, convenciéndose con amargura de que cada hombre vive en su propio túnel oscuro y sin salida.',
      contextoHistorico: 'Publicada en 1948 en la revista Sur tras ser rechazada por varias editoriales argentinas. Elogiada con entusiasmo por Albert Camus y Graham Greene, es una de las cumbres del existencialismo moderno.',
      analisisTrama: [
        {
          titulo: 'La confesión desde la cárcel y la ventanita del cuadro',
          detalle: 'Castel inicia la narración anunciando sin rodeos: "Bastará decir que soy Juan Pablo Castel, el pintor que mató a María Iribarne...". Rememora el Salón de Primavera donde expuso su lienzo Maternidad. En un rincón del cuadro había una ventanita que daba a una playa desierta con una mujer que miraba el mar; todos los críticos elogiaban el cuadro central, pero solo una mujer joven se detuvo a contemplar fijamente la ventanita, percibiendo el mensaje secreto de soledad absoluta que el pintor había plasmado.'
        },
        {
          titulo: 'La búsqueda obsesiva y el encuentro en la calle',
          detalle: 'Castel pasa meses maquinando escenarios y diálogos hipotéticos para reencontrar a la misteriosa mujer. La descubre casualmente en la calle entrando a la compañía de ferrocarriles, la aborda con brusquedad e insiste en saber qué vio en la ventana. María Iribarne, conmovida y distante, le confirma que la ventana representaba una soledad idéntica a la suya.'
        },
        {
          titulo: 'El matrimonio con Allende y la sospecha enfermiza',
          detalle: 'Al buscarla en su domicilio, Castel es recibido por Allende, un hombre ciego de modales caballerescos que resulta ser el esposo de María. Allende le entrega una carta de María que dice únicamente: "Yo también pienso en usted". En vez de alegrarse, la mente hiperanalítica de Castel empieza a tejer una maraña de dudas atroces: si María engaña a un ciego con tanta naturalidad, ¿cómo no va a engañarlo a él? Castel la somete a interrogatorios asfixiantes exigiendo detalles de sus silencios y relaciones.'
        },
        {
          titulo: 'La estancia y la confirmación de la paranoia con Hunter',
          detalle: 'María invita a Castel a pasar unos días en la estancia campestre de su familia. Allí el pintor conoce a Hunter, primo de María, hombre mujeriego y superficial. Al observar las miradas y la complicidad entre ambos durante la cena, Castel concluye en un arrebato de celos que María es amante de Hunter y que su alma pura es una farsa que se entrega a múltiples hombres. Huye desesperado en medio de la tormenta de regreso a Buenos Aires.'
        },
        {
          titulo: 'El asesinato a puñaladas y la metáfora del túnel',
          detalle: 'Borracho y consumido por el odio, Castel consigue un cuchillo de cocina y regresa de noche a la estancia. Trepa por el balcón hasta el dormitorio de María; ante la mirada atónita de la mujer, le clava repetidas veces el cuchillo en el pecho y el vientre exclamando: "¡Tengo que matarte, María! ¡Me has dejado solo!". Regresa a la capital, le confiesa el homicidio al ciego Allende (quien enloquece de dolor gritándole: "¡Insensato!") y se entrega a la policía. En su celda solitaria, Castel reflexiona sobre la tragedia de su existencia: creyó que él y María caminaban por senderos paralelos, cuando en verdad él siempre transitó por un túnel cerrado y oscuro, mientras ella caminaba libre por el mundo exterior.'
        }
      ],
      personajes: [
        { nombre: 'Juan Pablo Castel', rol: 'Narrador homicida', descripcion: 'Pintor misántropo, hiperracional y neurótico cuya obsesión por la pureza lo lleva a destruir el objeto de su amor.' },
        { nombre: 'María Iribarne', rol: 'Víctima enigmática', descripcion: 'Mujer misteriosa y melancólica que comprende la soledad del pintor pero conserva zonas de intimidad inalcanzables.' },
        { nombre: 'Allende', rol: 'Esposo ciego', descripcion: 'Hombre noble y sereno que confía ciegamente en María, destrozado por la revelación de Castel.' },
        { nombre: 'Hunter', rol: 'Primo hacendado', descripcion: 'Hombre mundano y seductor cuya presencia desata la paranoia criminal definitiva de Castel.' }
      ],
      temasClave: [
        { titulo: 'La incomunicación humana insuperable', explicacion: 'La tragedia de dos almas que se reconocen en el arte pero son incapaces de convivir en la realidad terrenal.' },
        { titulo: 'La metáfora del túnel', explicacion: 'El aislamiento patológico de quien vive encerrado en sus propias obsesiones sin poder conectar verdaderamente con el prójimo.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Novela corta existencialista de Ernesto Sábato. Confesión carcelaria del pintor Juan Pablo Castel, quien tras descubrir a María Iribarne contemplando la ventanita de su cuadro, la asesina devorado por los celos y la incomunicación.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Novela corta psicológica' },
        { clave: 'Autor', valor: 'Ernesto Sábato (Rojas, Argentina)' },
        { clave: 'Año de publicación', valor: '1948 (Revista Sur)' },
        { clave: 'Voz narrativa', valor: 'Primera persona testimonial / confesional' },
        { clave: 'Frase inicial célebre', valor: '"Bastará decir que soy Juan Pablo Castel, el pintor que mató a María Iribarne..."' }
      ],
      elementosClave: [
        { titulo: 'La ventanita del cuadro', contenido: 'Espacio simbólico donde una mujer mira una playa desierta, punto de encuentro espiritual inicial entre Castel y María.' },
        { titulo: 'La ceguera de Allende', contenido: 'Simboliza la ceguera moral y la vulnerabilidad frente a las pasiones oscuras del ser humano.' },
        { titulo: 'El túnel existencial', contenido: 'Metáfora central de la soledad irremediable de quien habita en su propia mente desquiciada.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Juan Pablo Castel se obsesiona inicialmente con María Iribarne?',
          respuesta: 'Porque en su exposición artística ella fue la única persona que se detuvo a contemplar fijamente la pequeña ventanita de su cuadro Maternidad.'
        },
        {
          pregunta: '¿Qué le confiesa Castel al ciego Allende tras cometer el asesinato de María?',
          respuesta: 'Le revela que María lo engañaba a él, a Hunter y a todos, y que acaba de asesinarla en la estancia.'
        }
      ]
    }
  },
  {
    id: 'la-odisea',
    titulo: 'La Odisea',
    autor: 'Homero',
    año: 'Siglo VIII a. C.',
    pais: 'Grecia Clásica',
    genero: 'Épico',
    especie: 'Epopeya de aventuras / Nostos',
    corriente: 'Clasicismo Griego',
    temaPrincipal: 'El retorno azaroso del héroe a su patria (nostos), la fidelidad conyugal inquebrantable y el triunfo de la astucia y la inteligencia sobre la fuerza bruta.',
    portadaGradiente: 'linear-gradient(145deg, #0c4a6e 0%, #0284c7 50%, #082f49 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Tras la caída de Troya, Odiseo (Ulises), rey de Ítaca, padece diez años de penosas desventuras marítimas provocadas por la furia del dios Poseidón antes de poder regresar a su patria. Mientras tanto, en su palacio de Ítaca, una turba de más de un centenar de pretendientes descarados devora sus rebaños y acosa a su fiel esposa Penélope para obligarla a casarse. Con la protección de la diosa Atenea, su hijo Telémaco emprende viaje en su búsqueda; Odiseo relata sus prodigiosas travesías a los reyes feacios, llega secretamente a Ítaca disfrazado de anciano mendigo, supera la prueba del arco de Penélope y, junto a su hijo y dos fieles servidores, extermina a todos los pretendientes restituyendo el orden legítimo en su hogar.',
      contextoHistorico: 'Compuesta en hexámetros dactílicos en la Jonia arcaica. Complemento pacífico y reconstructor de La Ilíada: si la primera cantaba a la guerra y la fuerza destructiva de Aquiles, La Odisea ensalza la paz, la reconstrucción civil, los lazos familiares y la astucia ingeniosa (metis).',
      analisisTrama: [
        {
          titulo: 'La Telemaquia y la desolación del palacio de Ítaca (Cantos I - IV)',
          detalle: 'La epopeya arranca in media res con la asamblea de los dioses en el Olimpo: aprovechando la ausencia de Poseidón, Atenea intercede ante Zeus para liberar a Odiseo, retenido en la isla Ogigia por la ninfa Calipso. Atenea desciende a Ítaca bajo la figura de Mentes y alienta al joven príncipe Telémaco a convocar una asamblea de ancianos y zarpar rumbo a Pilos (donde el rey Néstor) y Esparta (donde Menelao y la reconciliada Helena) para recabar noticias sobre el paradero de su padre. En Ítaca se describe el asedio brutal de los pretendientes, encabezados por los insolentes Antínoo y Eurímaco, quienes derrochan la hacienda familiar mientras Penélope posterga su boda tejiendo de día un sudario fúnebre para Laertes que desteje en secreto por las noches.'
        },
        {
          titulo: 'La liberación de Ogigia y la llegada al reino de Feacia (Cantos V - VIII)',
          detalle: 'Hermes vuela con sus sandalias aladas hasta la cueva de Calipso y le transmite la orden irrevocable de Zeus: debe dejar partir al héroe. Aunque desconsolada, Calipso suministra hachas y madera a Odiseo para construir una rústica balsa. Odiseo navega durante dieciocho días hasta divisar Esqueria (tierra de los feacios); Poseidón divisa la nave y desata una tempestad colosal que despedaza la balsa. Odiseo nada exhausto durante dos días protegido por el velo mágico de la diosa marina Ino Leucótea, hasta encallar desnudo y maltrecho en la desembocadura de un río. Es hallado dormido bajo unos arbustos por la princesa Nausícaa, hija del rey Alcínoo y la reina Arete, quien acudió a lavar túnicas con sus esclavas. La princesa le brinda ropas y alimento y lo guía al palacio real, donde Odiseo es acogido con hospitalidad sagrada. Durante el banquete, el aedo ciego Demódoco canta los episodios del caballo de madera y la destrucción de Troya; Odiseo rompe a llorar ocultando su rostro con el manto, se da a conocer solemnemente ante los presentes y comienza el relato de sus diez años de errancia.'
        },
        {
          titulo: 'El gran relato retrospectivo de Odiseo: monstruos, magas y hecatombes (Cantos IX - X)',
          detalle: 'Odiseo narra cronológicamente sus aventuras: tras saquear la ciudad de los cicones y visitar el país de los lotófagos (cuya flor de loto borraba el recuerdo de la patria), arriba a la isla de los Cíclopes. Con doce de sus mejores hombres penetra en la cueva del gigante antropófago Polifemo, hijo de Poseidón, quien devora a varios camaradas aplastándolos contra el suelo. Odiseo embriaga a la fiera con vino puro, se presenta falsamente bajo el nombre de "Nadie" y, cuando el monstruo duerme profundamente, le clava una estaca de olivo ardiente en su único ojo. Al clamar Polifemo ayuda a sus hermanos gritando que "Nadie lo está matando", los cíclopes se retiran. Odiseo escapa atándose al vientre de los carneros; al zarpar, su vanidad heroica lo empuja a gritar su verdadero nombre, provocando que Polifemo suplique a su padre Poseidón que condene a Odiseo a perder a todos sus hombres y regresar tarde y en nave ajena. Luego visitan la isla de Eolo, quien le entrega una bolsa de cuero que encierra los vientos adversos; a la vista de Ítaca, los marineros codiciosos abren la bolsa creyéndola llena de oro desatando un huracán que los regresa al océano. En el país de los lestrigones sufren el ataque de gigantes que destruyen once de sus doce naves arrojando peñascos. Con su único barco restante llegan a la isla Eea, donde la hechicera Circe transforma a la tripulación en cerdos con un filtro mágico; Odiseo, provisto por Hermes de la hierba protectora moly, somete a la maga con su espada, libera a sus hombres y convive con ella durante un año.'
        },
        {
          titulo: 'La Nékya: el descenso al Hades y el paso de las sirenas (Cantos XI - XII)',
          detalle: 'Por instrucción de Circe, Odiseo viaja a las brumas del país de los cimerios y realiza un sacrificio de sangre negra para consultar a los muertos en el inframundo (Nékya). El alma del adivino tebano Tiresias le vaticina los peligros del regreso y le advierte terminantemente no tocar las vacas sagradas del Sol en la isla Trinacia. En el Hades dialoga con su madre Anticlea (quien murió de tristeza aguardándolo), con Agamenón (quien le advierte desconfiar de las mujeres tras ser asesinado por Clitemnestra) y con Aquiles, quien pronuncia la famosa sentencia: "Preferiría ser el siervo más humilde en la tierra antes que reinar sobre todas las sombras de los muertos". Reanudado el viaje, Odiseo elude el canto hipnótico de las Sirenas haciéndose atar al mástil de la nave mientras sus remeros llevan tapones de cera; luego atraviesa el estrecho desfiladero entre los monstruos Escila (que devora a seis marineros con sus seis fauces) y Caribdis (remolino que traga el mar). En Trinacia, atrapados por la calma chicha y el hambre, sus hombres desobedecen las advertencias y degüellan a las vacas sagradas del dios Helios; en castigo, Zeus fulmina el barco con un rayo matando a todos los marineros. Solo Odiseo sobrevive aferrado a la quilla, flotando durante nueve días hasta la isla de Calipso.'
        },
        {
          titulo: 'El regreso incógnito a Ítaca y el reconocimiento en la majada (Cantos XIII - XVI)',
          detalle: 'Fascinados por el relato, los reyes feacios colman a Odiseo de tesoros de bronce y oro y lo trasladan dormido a una caleta de Ítaca. Al despertar, Atenea disfraza al héroe de anciano pordiosero cubriéndolo de harapos y arrugas para protegerlo. Odiseo acude a la cabaña del leal porquero Eumeo, quien lo acoge con hospitalidad sin reconocerlo. Llega allí el príncipe Telémaco recién retornado de su periplo por Esparta; cuando quedan solos en la choza, Atenea devuelve a Odiseo su juventud y estatura divina. Padre e hijo rompen en un llanto torrencial abrazándose y trazan un plan secreto para castigar a los pretendientes sin revelar a nadie, ni siquiera a Penélope, la identidad del viajero.'
        },
        {
          titulo: 'El palacio, el perro Argos y la prueba del arco (Cantos XVII - XXI)',
          detalle: 'Odiseo regresa a su palacio bajo el aspecto del mendigo andrajoso. En el umbral yace abandonado sobre un montón de estiércol su viejo perro de cacería Argos; tras veinte años de espera, el animal reconoce a su amo por el olfato, bate la cola, baja las orejas y muere en paz habiendo visto al héroe. En el banquete los pretendientes maltratan al mendigo: Antínoo le arroja un escabel al hombro y el vagabundo Iro lo desafía a una pelea a puñetazos de la que Odiseo sale vencedor de un solo golpe. Penélope dialoga de noche con el forastero; la anciana nodriza Euriclea le lava los pies y reconoce a su amo por una antigua cicatriz que un jabalí le provocó en el monte Parnaso durante su mocedad; Odiseo le tapa la boca amenazándola con la muerte si rompe el secreto. Penélope anuncia entonces a los pretendientes el desafío final: desposará a aquel que logre tensar con facilidad el descomunal arco de Odiseo y disparar una flecha haciéndola pasar a través de los orificios de doce hachas alineadas en fila. Uno tras otro, los jóvenes pretendientes untan el arco con sebo caliente pero son incapaces de arquear la madera.'
        },
        {
          titulo: 'La matanza de los pretendientes y el reencuentro en el tálamo nupcial (Cantos XXII - XXIV)',
          detalle: 'Ante las protestas e insultos de los príncipes, el mendigo solicita probar sus fuerzas. Con pasmosa serenidad y destreza musical, Odiseo curva el arco divino de un solo tirón, ensarta la cuerda que vibra con sonido de golondrina y dispara la flecha atravesando limpiamente el ojo de las doce hachas. En ese instante supremo, se despoja de los harapos, salta al umbral del gran salón y atraviesa la garganta del cabecilla Antínoo con un flechazo mortal. Desatada la identidad del rey ("¡Perros! ¡Pensasteis que no volvería jamás de Troya!"), Odiseo, Telémaco, Eumeo y el boyero Filetio cierran los portones de bronce y masacran a los pretendientes en una sangrienta carnicería con lanzas y flechas asistidos por la égida aterradora de Atenea. Luego ajusticia a las doce esclavas desleales que habían convivido con los invasores haciéndolas limpiar la sangre del salón antes de ahorcarlas en el patio. Penélope aún duda de si se trata de un dios disfrazado y lo pone a prueba ordenando a la nodriza trasladar su lecho fuera de la alcoba; Odiseo se indigna explicando que aquel tálamo es inamovible porque él mismo talló uno de sus postes en el tronco vivo de un olivo enraizado en la roca. Penélope rompe a llorar reconociendo al verdadero esposo y ambos se funden en un abrazo postergado durante veinte años. Al día siguiente, los parientes armados de los pretendientes muertos marchan hacia la casa de campo de Laertes buscando venganza, pero la diosa Atenea desciende por mandato de Zeus y sella un pacto de paz perpetua en toda la isla de Ítaca.'
        }
      ],
      personajes: [
        { nombre: 'Odiseo (Ulises)', rol: 'Héroe de la astucia ("El fecundo en ardides")', descripcion: 'Rey de Ítaca y estratega supremo de Troya, arquetipo de la resiliencia humana que vence a los monstruos con prudencia e inteligencia moral.' },
        { nombre: 'Penélope', rol: 'Esposa fiel y prudente', descripcion: 'Reina de Ítaca que preserva el patrimonio y su amor conyugal durante dos décadas burlando a los pretendientes con el tejido del sudario.' },
        { nombre: 'Telémaco', rol: 'Hijo en maduración heroica', descripcion: 'Príncipe que transita de la timidez adolescente a la adultez guerrera tras emprender el viaje iniciático y pelear codo a codo con su padre.' },
        { nombre: 'Atenea (Palas)', rol: 'Diosa protectora ("La de ojos glaucos")', descripcion: 'Encarnación divina de la sabiduría práctica y la estrategia bélica, mediadora cósmica y guía constante de la estirpe de Odiseo.' },
        { nombre: 'Antínoo y Eurímaco', rol: 'Cabecillas de los pretendientes', descripcion: 'Nobles insolentes, voraces y sacrílegos que violan las leyes de la hospitalidad y conspiran para asesinar a Telémaco.' },
        { nombre: 'Eumeo', rol: 'Porquero fiel y noble de corazón', descripcion: 'Siervo de linaje regio esclavizado que encarna la lealtad incorruptible y la hospitalidad con el forastero desvalido.' }
      ],
      temasClave: [
        { titulo: 'El retorno heroico (Nostos) y la identidad', explicacion: 'La travesía no es solo geográfica; es la reconquista penosa del estatus social de rey, padre, esposo e hijo en su comunidad.' },
        { titulo: 'La sagrada ley de la hospitalidad (Xenía)', explicacion: 'Tratar con piedad al huésped y forastero es un deber vigilado por Zeus Hospitalario; quienes la violan (como los pretendientes o Polifemo) reciben el castigo letal.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Segunda epopeya homérica fundacional de la cultura clásica. Narra las peripecias marítimas de diez años de Odiseo para retornar a Ítaca tras la Guerra de Troya, el peregrinaje de su hijo Telémaco y la reconquista de su trono mediante la matanza de los pretendientes que acosaban a Penélope.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Épico — Epopeya de aventuras / Viaje' },
        { clave: 'Autor atribuido', valor: 'Homero (Siglo VIII a. C.)' },
        { clave: 'Estructura formal', valor: '24 cantos en hexámetros dactílicos agrupados en 3 grandes secciones' },
        { clave: 'Tres secciones canónicas', valor: '1) Telemaquia (cantos I-IV), 2) Nostos / El regreso (cantos V-XII), 3) Venganza en Ítaca (cantos XIII-XXIV)' },
        { clave: 'Virtud rectora del héroe', valor: 'Metis (inteligencia astuta, prudencia, capacidad de simulación)' }
      ],
      elementosClave: [
        { titulo: 'El engaño del sudario de Penélope', contenido: 'Tejía de día el manto fúnebre para su suegro Laertes y lo desteje de noche a la luz de las antorchas durante tres años para no casarse.' },
        { titulo: 'El ardid de "Nadie"', contenido: 'Odiseo engaña al cíclope Polifemo dándole ese nombre para que sus hermanos no acudan en su auxilio cuando le clavan la estaca en el ojo.' },
        { titulo: 'La cicatriz de la pierna', contenido: 'Herida provocada por la colmillo de un jabalí en el Parnaso con que la anciana nodriza Euriclea reconoce a su amo al lavarle los pies.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Poseidón persigue con tanta saña a Odiseo a lo largo de los mares?',
          respuesta: 'Porque Odiseo cegó con una estaca al cíclope Polifemo, quien era hijo del dios del mar y le suplicó venganza cósmica contra el héroe.'
        },
        {
          pregunta: '¿Cuál es la prueba definitiva con la que Penélope comprueba la verdadera identidad de Odiseo?',
          respuesta: 'El enigma del lecho nupcial inamovible, cuyo poste secreto fue construido por el propio Odiseo sobre el tronco enraizado de un árbol de olivo vivo.'
        }
      ]
    }
  },
  {
    id: 'la-divina-comedia',
    titulo: 'La Divina Comedia',
    autor: 'Dante Alighieri',
    año: '1304 - 1321',
    pais: 'Italia (Florencia / Rávena)',
    genero: 'Épico',
    especie: 'Epopeya religiosa / alegórica',
    corriente: 'Prerrenacimiento Italiano (Trecento)',
    temaPrincipal: 'El viaje de redención espiritual del alma humana desde las tinieblas del pecado hasta la contemplación beatífica de la gloria divina.',
    portadaGradiente: 'linear-gradient(145deg, #450a0a 0%, #991b1b 50%, #1e1b4b 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'A mitad del camino de la vida terrenal (a los 35 años), Dante se encuentra extraviado en una selva oscura dominada por el pecado. A punto de perecer acosado por tres fieras simbólicas, es rescatado por el poeta romano Virgilio, enviado desde el cielo por intercesión de Beatriz. Guiado por Virgilio (que personifica la razón humana), Dante desciende a los nueve círculos del Infierno conociendo los atroces castigos de los condenados según la ley del contrapaso. Luego ascienden la escarpada montaña del Purgatorio dividida en siete terrazas para purificar las manchas del alma. Al llegar al Paraíso Terrenal, Virgilio se despide y Beatriz (símbolo de la fe y la teología revelada) asume la guía de Dante a través de las nueve esferas celestiales. Finalmente, guiado por el místico San Bernardo en el Empíreo, Dante contempla la luz trina de Dios en la Cándida Rosa, consumando su beatitud eterna.',
      contextoHistorico: 'Escrita en dialecto toscano durante el amargo destierro político de Dante de su natal Florencia (debido a las sangrientas guerras civiles entre güelfos blancos y negros). Obra cumbre de la cristiandad medieval que sintetiza la teología de Santo Tomás de Aquino, la filosofía aristotélica y el orden astronómico ptolemaico.',
      analisisTrama: [
        {
          titulo: 'La selva oscura, las tres fieras y el auxilio providencial (Canto I)',
          detalle: 'En el equinoccio de primavera del año jubilar de 1300 (la noche del Jueves Santo), Dante despierta extraviado en una selva enmarañada y sombría que representa la vida pecaminosa. Intenta escalar una colina luminosa bañada por los primeros rayos del sol, pero tres bestias feroces le bloquean el sendero: una pantera ágil y manchada (alegoría de la lujuria), un león soberbio con la cabeza alzada (alegoría de la soberbia) y una loba famélica e insaciable (alegoría de la avaricia y codicia material). Cuando retrocede al abismo, se le aparece la sombra venerable del poeta latino Virgilio, quien le anuncia que no puede subir la colina directamente y que debe emprender un viaje iniciático a través de los reinos de ultratumba. Virgilio le confiesa que acudió conmovido por la Virgen María, Santa Lucía y Beatriz, quien bajó del cielo al Limbo para rogar por la salvación de su amado.'
        },
        {
          titulo: 'El Infierno: estructura cónica, contrapaso y los nueve círculos (Cantos II - XXXIV)',
          detalle: 'Cruzan la terrible puerta del averno que lleva inscrita la célebre advertencia: "¡Lasciate ogne speranza, voi ch\'intrate!" (¡Abandonad toda esperanza, los que entráis!). El barquero Caronte los cruza por el río Aqueronte. El Infierno es un descomunal abismo cónico subterráneo que llega al centro exacto de la Tierra, dividido en nueve círculos concéntricos donde los pecadores sufren el contrapaso (el castigo reproduce por analogía o antítesis la naturaleza del pecado cometido):\n- Círculo 1 (Limbo): almas virtuosas no bautizadas (Homero, Sócrates, Aristóteles, Horacio) que solo sufren la pena de no poder contemplar a Dios.\n- Pecados de Incontinencia (Círculos 2 al 5): el Círculo 2 alberga a los lujuriosos arrastrados eternamente por un torbellino de viento infernal (donde Dante dialoga conmovido con Paolo y Francesca da Rimini); el Círculo 3 a los glotones sumergidos en fango pestilente bajo lluvia helada custodiados por el can Cerbero (encuentro con Ciacco); el Círculo 4 a los avaros y pródigos empujando enormes peñascos chocando entre sí; el Círculo 5 a los coléricos e iracundos desgarrándose en las aguas cenagosas de la laguna Estigia.\n- La Ciudad de Dite y los Pecados de Violencia (Círculos 6 y 7): tras cruzar la muralla de fuego con el auxilio de un ángel, visitan el Círculo 6 donde los herejes arden en sepulcros abiertos al rojo vivo (Farinata degli Uberti). En el Círculo 7 se castiga a los violentos en tres recintos: violentos contra el prójimo sumergidos en el río hirviente de sangre Flegetonte saeteados por centauros; violentos contra sí mismos (suicidas) transformados en zarzas secas cuyas ramas desgarran las Arpías (Pier della Vigna); y violentos contra Dios y la naturaleza (blasfemos y sodomitas) caminando bajo una lluvia incesante de copos de fuego sobre arena hirviente (su maestro Brunetto Latini).\n- Pecados de Malicia y Fraude (Círculos 8 y 9): descendiendo sobre el lomo del monstruo Gerión acceden al Círculo 8 (Malebolge), diez fosas concéntricas de piedra donde sufren rufianes azotados por demonios, aduladores en excrementos humanos, simoníacos con las cabezas enterradas en pozos y los pies encendidos en llamas (papas corruptos), adivinos con el cuello retorcido mirando hacia atrás, estafadores en pez hirviente custodiados por diablos alados (Malebranche), hipócritas vestidos con capas doradas de pesado plomo, ladrones mordidos por serpientes que los desintegran y cenizas que renacen, malos consejeros envueltos en lenguas de fuego (Ulises y Diomedes), sembradores de discordia mutilados con espadas (Mahoma mutilado) y falsificadores atacados por la lepra y la rabia.\n- El Círculo 9 (El Lago Cocito): lago de hielo alimentado por las lágrimas del mundo donde los traidores yacen congelados en cuatro zonas: Caína (traidores a los parientes), Antenora (traidores a la patria, donde el conde Ugolino devora el cráneo del arzobispo Ruggieri que lo dejó morir de hambre con sus hijos en una torre), Tolomea (traidores a los huéspedes) y Judeca (traidores a sus bienhechores). En el centro cósmico del hielo yace Lucifer (Satán), gigantesco monstruo de tres cabezas y seis alas de murciélago que bate sin cesar helando las aguas; de sus tres fauces cuelgan masticados los tres mayores traidores de la historia: Judas Iscariote (traidor a Cristo / poder espiritual) y Bruto y Casio (traidores a Julio César / poder civil imperial). Dante y Virgilio trepan por el lomo peludo de la fiera cósmica atravesando el centro de gravedad terrestre y salen por un túnel escarpado al hemisferio sur: "Y por allí salimos a volver a ver las estrellas".'
        },
        {
          titulo: 'El Purgatorio: la montaña de las siete cornisas de expiación (Cantos I - XXXIII)',
          detalle: 'Amanece el Domingo de Resurrección en una isla montañosa en medio de las aguas australes. Son recibidos por el guardián de la libertad, Catón de Útica. El Purgatorio es una montaña cónica que asciende hacia el cielo, antítesis geométrica del Infierno. En el Antepurgatorio aguardan las almas de los negligentes que se arrepintieron a última hora de sus vidas. Un ángel con una espada de luz traza siete letras "P" (los siete pecados capitales) en la frente de Dante antes de franquear la puerta de san Pedro custodiada por las llaves de plata y oro. Las almas ascienden cantando himnos sacros por siete terrazas donde expían sus faltas: 1) Soberbia (cargando pesadas rocas en la espalda); 2) Envidia (con los párpados cosidos con alambre de hierro); 3) Ira (caminando en una niebla de humo asfixiante); 4) Pereza (corriendo sin descanso); 5) Avaricia (postrados boca abajo en el suelo); 6) Gula (hambrientos ante árboles de frutos inaccesibles y aguas cristalinas); y 7) Lujuria (caminando a través de una muralla de fuego ardiente). Tras purgar cada pecado, un ángel borra una "P" de la frente del poeta con sus alas y el ascenso se vuelve más liviano. En la cima alcanzan el Paraíso Terrenal (el Edén incontaminado). Allí Virgilio corona moralmente a Dante diciéndole que su voluntad es ya libre, sana y recta, cesando su función como guía. Aparece entonces una procesión mística triunfal y desciende Beatriz vestida con velo blanco, manto verde y túnica roja como el fuego; Dante rompe a llorar y se confiesa arrepentido de sus desvíos mundanos, sumergiéndose en las aguas del río Leteo (para olvidar el mal) y en el río Eunoé (para revivir la memoria de todas las buenas obras realizadas).'
        },
        {
          titulo: 'El Paraíso: las nueve esferas celestiales y la visión de la Cándida Rosa (Cantos I - XXXIII)',
          detalle: 'Elevándose mediante la mirada luminosa de Beatriz, Dante asciende a través de las nueve esferas del cosmos ptolemaico que giran alrededor de la Tierra, habitadas por espíritus bienaventurados que se manifiestan como fulgores celestes:\n1) Luna (almas que quebrantaron votos religiosos por fuerza ajena: Piccarda Donati);\n2) Mercurio (espíritus que obraron el bien por amor a la fama y el honor: emperador Justiniano);\n3) Venus (amantes que sublimaron la pasión terrenal en caridad);\n4) Sol (doctores de la Iglesia y teólogos sabios: santo Tomás de Aquino alabando a san Francisco de Asís);\n5) Marte (guerreros y mártires de la fe organizados en una inmensa cruz luminosa: su antepasado Cacciaguida profetizándole su destierro);\n6) Júpiter (gobernantes justos que forman las letras de la justicia y un águila imperial celestial);\n7) Saturno (espíritus contemplativos que ascienden por una escala de oro hacia el infinito);\n8) Cielo Estrellado (los santos apóstoles: san Pedro, Santiago y san Juan examinan a Dante sobre las tres virtudes teologales: Fe, Esperanza y Caridad);\n9) Primer Móvil (orden de las jerarquías angélicas girando alrededor de un punto de luz cegadora).\nTraspasando el cosmos material acceden al Empíreo, morada inmaterial de Dios fuera del tiempo y del espacio. El río de luz se transforma en una inmensa Cándida Rosa donde reposan en tronos de oro todos los beatos de la historia. Beatriz ocupa su trono celeste y cede el puesto de guía al místico doctor san Bernardo de Claraval. San Bernardo eleva una bellísima plegaria a la Virgen María ("Virgen Madre, hija de tu Hijo...") para que conceda a Dante la gracia de contemplar la esencia divina sin morir en el intento. Dante fija sus ojos en la Luz Eterna increada: vislumbra tres círculos de tres colores distintos que ocupan un solo espacio (el misterio de la Santísima Trinidad) y en el círculo interior percibe la figura humana encarnada de Cristo. Abrumado por una plenitud que desborda el intelecto humano, su voluntad y deseo quedan sincronizados armónicamente con "el Amor que mueve el sol y las demás estrellas".'
        }
      ],
      personajes: [
        { nombre: 'Dante', rol: 'Protagonista y peregrino', descripcion: 'Hombre extraviado que encarna a la humanidad caída en busca de la regeneración moral y la salvación eterna.' },
        { nombre: 'Virgilio', rol: 'Guía de la Razón humana y la Sabiduría clásica', descripcion: 'Poeta latino autor de La Eneida, símbolo del conocimiento filosófico secular que conduce al hombre hasta el límite del pecado.' },
        { nombre: 'Beatriz Portinari', rol: 'Guía de la Fe, la Teología y la Gracia divina', descripcion: 'Dama florentina idealizada por el Dolce Stil Novo que desciende del Empíreo para guiar el alma de Dante a la beatitud celestial.' },
        { nombre: 'San Bernardo de Claraval', rol: 'Guía de la Mística contemplativa', descripcion: 'Santo contemplativo que suplica a la Virgen María para que Dante obtenga la visión beatífica de la Trinidad en el Empíreo.' },
        { nombre: 'Lucifer (Satán / Dite)', rol: 'Monstruo del mal cósmico', descripcion: 'Ángel rebelde caído clavado en el hielo del Cocito, cuyos tres rostros devoran a Judas, Bruto y Casio en el corazón del Infierno.' }
      ],
      temasClave: [
        { titulo: 'La ley del Contrapaso (Contrappasso)', explicacion: 'El principio teológico según el cual las penas eternas corresponden rigurosamente a la naturaleza moral del pecado cometido en la tierra.' },
        { titulo: 'La arquitectura numerológica sagrada', explicacion: 'La omnipresencia del número 3 (Trinidad) y el número 10 (perfección pitagórica): 3 reinos, 33 cantos por cántica más el canto introductorio (100 cantos en total), estrofas en tercetos encadenados.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Monumento universal del Prerrenacimiento y de la cristiandad medieval. Narra el viaje del poeta Dante a través del Infierno (9 círculos cónicos), el Purgatorio (7 terrazas de expiación) y el Paraíso (9 esferas celestiales y el Empíreo), guiado por Virgilio y Beatriz hasta alcanzar la contemplación beatífica de Dios.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Épico — Epopeya alegórica religiosa' },
        { clave: 'Autor', valor: 'Dante Alighieri ("El Poeta Supremo", Florencia)' },
        { clave: 'Métrica y estrofa', valor: 'Endecasílabos agrupados en tercetos encadenados (terza rima)' },
        { clave: 'Composición total', valor: '100 cantos (Infierno: 34 cantos; Purgatorio: 33 cantos; Paraíso: 33 cantos)' },
        { clave: 'Nombre original del autor', valor: '"Comedia" (el adjetivo "Divina" fue agregado por Giovanni Boccaccio en 1555)' }
      ],
      elementosClave: [
        { titulo: 'Las tres fieras de la selva', contenido: 'La pantera (lujuria / Florencia), el león (soberbia / rey de Francia) y la loba (avaricia / curia papal romana).' },
        { titulo: 'El río Leteo y el río Eunoé', contenido: 'En la cima del Purgatorio: el primero borra el recuerdo del mal y el segundo reaviva la memoria de las buenas acciones.' },
        { titulo: 'Palabra final de las tres cánticas', contenido: 'Tanto el Infierno, el Purgatorio como el Paraíso culminan exactamente con la misma palabra: "estrellas" (stelle).' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Virgilio no puede acompañar a Dante a recorrer el reino del Paraíso?',
          respuesta: 'Porque Virgilio murió antes de la venida de Cristo y no recibió el bautismo, habitando en el Limbo; por ello solo simboliza la razón humana natural y no la fe revelada.'
        },
        {
          pregunta: '¿Quiénes son los tres pecadores que Lucifer mastica eternamente en sus tres fauces?',
          respuesta: 'Judas Iscariote (traidor supremo a Jesucristo y a la Iglesia espiritual) en el centro, y Bruto y Casio (traidores al emperador Julio César y al orden imperial civil) a los lados.'
        }
      ]
    }
  },
  {
    id: 'fausto',
    titulo: 'Fausto',
    autor: 'Johann Wolfgang von Goethe',
    año: '1808 (Parte I) / 1832 (Parte II)',
    pais: 'Alemania (Weimar)',
    genero: 'Dramático',
    especie: 'Drama poético / filosófico universal',
    corriente: 'Romanticismo Alemán / Clasicismo de Weimar',
    temaPrincipal: 'La insatisfacción perpetua del hombre ante los límites del conocimiento terrenal, la dialéctica entre el bien y el mal, y la salvación a través de la acción constructiva y el amor puro.',
    portadaGradiente: 'linear-gradient(145deg, #1c1917 0%, #7f1d1d 50%, #450a0a 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Desesperado por constatar que tras una vida de estudio de la teología, la filosofía, la medicina y la jurisprudencia no sabe nada sobre los misterios últimos del universo, el sabio anciano doctor Enrique Fausto pacta con el demonio Mefistófeles. A cambio de que Mefistófeles sea su siervo en la tierra y le procure una vivencia tan plena que lo haga exclamar ante el instante: "¡Deténte, eres tan hermoso!", Fausto entregará su alma en el más allá. Rejuvenecido por un filtro mágico, vive en la Primera Parte la desgarradora tragedia amorosa de la doncella inocente Margarita (Gretchen), quien cae en desgracia, pierde a su familia y es ejecutada pero redimida por la misericordia divina. En la monumental Segunda Parte, Fausto transita por la corte imperial, se une en Esparta con la mítica Helena de Troya y, en su ancianidad secular, consagra sus esfuerzos a ganar tierras fértiles al mar para el trabajo libre de los hombres; al pronunciar la frase prohibida antes de expirar, Mefistófeles cree haber ganado la apuesta, pero una legión de ángeles rescata el alma de Fausto guiada por el amor del Eterno Femenino.',
      contextoHistorico: 'Obra cumbre de las letras alemanas a la que Goethe dedicó sesenta años de su vida (1772-1831). Sintetiza la rebelión juvenil del Sturm und Drang, la armonía serena del Clasicismo de Weimar y las inquietudes humanistas e industriales del siglo XIX.',
      analisisTrama: [
        {
          titulo: 'El Prólogo en el cielo y la apuesta cósmica (Escena inicial)',
          detalle: 'La obra se abre con una triple dedicatoria y el célebre Prólogo en el cielo, réplica del bíblico Libro de Job: mientras los tres arcángeles (Rafael, Gabriel y Miguel) alaban la magnificencia del cosmos, el demonio Mefistófeles se presenta con tono burlón criticando la pequeñez y las miserias del ser humano. Dios menciona como ejemplo de nobleza a su siervo, el doctor Fausto. Mefistófeles se jacta de que es capaz de extraviar al sabio y arrastrarlo por senderos de bajeza terrena si se le concede plena libertad. El Señor acepta la apuesta afirmando una verdad metafísica fundamental: "Mientras el hombre lucha, yerra; pero un hombre bueno, aun en medio de sus oscuros impulsos, tiene siempre conciencia del sendero recto".'
        },
        {
          titulo: 'La desesperación del sabio y el pacto de sangre con Mefistófeles (Parte I)',
          detalle: 'En su gótica y polvorienta celda de estudio, el doctor Fausto contempla con amargura los miles de volúmenes que ha estudiado sin lograr desentrañar el secreto íntimo que mueve el mundo. Intenta la magia e invoca al Espíritu de la Tierra, pero este lo rechaza con desdén recordándole su frágil estatura mortal. Desesperado, Fausto toma una copa de veneno para suicidarse; en ese instante resuenan en la ciudad las campanas de Pascua y los coros angélicos, cuyo recuerdo infantil de fe detiene su mano. Durante un paseo campestre con su discípulo Wagner, un perro de aguas negro sigue a Fausto hasta su cuarto; al encerrarse, el animal se transforma en niebla y de ella emerge Mefistófeles vestido como un caballero transeúnte. Tras debatir sobre el vacío de los placeres materiales, sellan un pacto firmado con sangre: Fausto no pide riquezas ni honores vulgares, sino sumergirse en la totalidad del dolor y el goce humano; si en algún momento se siente satisfecho y dice al instante que pasa: "¡Deténte, eres tan hermoso!" ("Verweile doch! du bist so schön!"), Mefistófeles podrá apoderarse de su alma.'
        },
        {
          titulo: 'La cocina de la bruja y la tragedia de Margarita (Parte I - núcleo dramático)',
          detalle: 'Mefistófeles conduce a Fausto a la taberna de Auerbach en Leipzig y luego a la cocina de una bruja, donde el anciano sabio bebe una pócima mágica que le devuelve la juventud y exalta su apetito pasional. En una calle se cruza con Margarita (Gretchen), una humilde y piadosa doncella de quince años; deslumbrado por su pureza, Fausto exige al demonio que se la consagre. Con la ayuda de regalos de joyas dejados en su armario y la complicidad de la vecina Marta, Fausto corteja a la joven en el jardín. Margarita percibe la maldad intrínseca de Mefistófeles ("Ese hombre me inspira un horror insuperable") pero se entrega a la pasión de Fausto. La tragedia se desencadena en espiral: para encontrarse a solas, Margarita suministra a su madre un somnífero que resulta ser veneno letal; su hermano, el soldado Valentín, regresa del frente para defender el honor de su hermana y desafía a Fausto en duelo callejero; asistido por la espada invisible de Mefistófeles, Fausto atraviesa el corazón de Valentín, quien al agonizar maldice públicamente a Margarita tratándola de ramera. Fausto huye a las montañas de Harz donde participa en el aquelarre blasfemo de la Noche de Walpurgis, pero en medio de la orgía vislumbra el espectro de Margarita con una cinta roja como una línea de sangre degollada en el cuello.'
        },
        {
          titulo: 'La celda de la prisión y la salvación de Gretchen (Parte I - desenlace)',
          detalle: 'Fausto descubre con horror que Margarita, enloquecida de dolor y vergüenza tras dar a luz al hijo de ambos, ahogó al recién nacido en un estanque y ha sido condenada a morir decapitada en el patíbulo. Al filo del alba, Fausto y Mefistófeles irrumpen en el calabozo; Fausto suplica a Margarita que huya con él aprovechando las monturas diabólicas. Sin embargo, al divisar la silueta siniestra de Mefistófeles en la puerta, la joven recobra la lucidez, rechaza con asco la ayuda del demonio y se arroja de rodillas encomendando su alma al juicio misericordioso de Dios. Mefistófeles exclama con sarcasmo: "¡Está juzgada!"; pero una voz celestial resuena desde lo alto proclamando: "¡Está salvada!". Mefistófeles arrastra a Fausto consigo hacia las tinieblas mientras Margarita clama desde la celda por su salvación.'
        },
        {
          titulo: 'La corte imperial, el Homúnculo y Helena de Troya (Parte II, Actos I - III)',
          detalle: 'En la Segunda Parte, el drama trasciende lo individual para proyectarse sobre la historia humana, el arte y el mito clásico. Despertado por los espíritus del rocío en una pradera alpina, Fausto aparece en la corte decadente del emperador de Alemania, donde Mefistófeles alivia la bancarrota económica inventando el papel moneda respaldado por los tesoros subterráneos aún no excavados. Para divertir a la corte, Fausto viaja al misterioso reino de Las Madres (fuentes primordiales del ser) y trae los fantasmas de Paris y Helena. Mientras tanto, en el laboratorio, el pedante Wagner engendra mediante la química a un ser humano artificial en una probeta de cristal: el Homúnculo. Guiados por el diminuto ser, viajan a la Noche de Walpurgis clásica en Grecia, donde habitan esfinges, sirenas y filósofos antiguos. En el Acto III, ambientado en la Esparta mítica, Fausto se une nupcialmente con Helena de Troya, simbolizando la síntesis perfecta entre el espíritu germánico romántico y la belleza armónica del clasicismo griego. De su unión nace Euforión, joven alado y fogoso que personifica a la poesía rebelde (inspirado en Lord Byron); queriendo volar sin límites, Euforión se arroja al abismo y muere estrellado contra las rocas. Devastada, Helena se desvanece en una nube dejando solo sus velos en brazos de Fausto.'
        },
        {
          titulo: 'El proyecto del dique, la muerte de Fausto y el triunfo del amor (Parte II, Actos IV - V)',
          detalle: 'Fausto regresa a la realidad política: ayuda al emperador a sofocar una rebelión militar mediante estratagemas demoníacas y recibe como premio el dominio perpetuo de una franja de costas pantanosas e infértiles. En su extrema ancianidad y ciego de los ojos físicos por el aliento de la Preocupación (Sorge), Fausto encuentra el sentido superior de la existencia en la acción transformadora: moviliza a miles de trabajadores para construir colosales diques y canales que arrebaten tierras fértiles al océano salvaje, soñando con fundar una comunidad donde millones de seres humanos vivan en libertad mediante su esfuerzo cotidiano. Al escuchar el sonido de las palas cavando en la tierra (que en realidad son los lémures y espectros de Mefistófeles cavando su propia fosa mortuoria), Fausto anticipa la contemplación de ese pueblo libre y soberbio, y en un éxtasis espiritual pronuncia las palabras del pacto: "Al instante yo diría: ¡Deténte, eres tan hermoso!... En el presagio de tan alta felicidad, disfruto ahora del momento más sublime". Dicho esto, Fausto se desploma muerto sobre la tierra. Mefistófeles festeja su aparente triunfo reclamando el alma; sin embargo, en ese instante desciende una lluvia de rosas celestiales arrojada por coros de ángeles cuyo fuego de amor quema a los demonios y los hace huir. Los ángeles arrebatan el alma inmortal de Fausto elevándola a los cielos proclamando la ley de la gracia: "Al que siempre lucha y se esfuerza, a ese podemos redimirlo". En la cumbre celestial, ante la presencia de la Mater Gloriosa, el alma transfigurada de Margarita (llamada Una Poenitentium) intercede por Fausto y lo guía hacia las esferas de luz, mientras el coro místico pronuncia los versos finales que sellan la obra: "Todo lo perecedero / no es más que una figura; / lo inalcanzable aquí / se hace acontecimiento; / lo indescriptible / se ha consumado aquí; / el Eterno Femenino / nos arrastra hacia lo alto".'
        }
      ],
      personajes: [
        { nombre: 'Doctor Enrique Fausto', rol: 'Protagonista insaciable', descripcion: 'Erudito renacentista que personifica la pulsión humana indómita ("faústica") por franquear los límites del conocimiento y la experiencia terrenal.' },
        { nombre: 'Mefistófeles', rol: 'Espíritu de la negación ("El que siempre niega")', descripcion: 'Demonio cínico, irónico y escéptico que considera al hombre como una criatura ridícula y corruptible, operando como catalizador de la acción creadora.' },
        { nombre: 'Margarita (Gretchen)', rol: 'Amor puro y expiación', descripcion: 'Doncella inocente cuya caída en el pecado y condena terrenal es redimida por su fe incondicional, convirtiéndose en el vehículo de la salvación de Fausto.' },
        { nombre: 'Helena de Troya', rol: 'Símbolo de la Belleza clásica', descripcion: 'Reina mítica que encarna la armonía estética de Grecia en su unión temporal con el romanticismo nórdico.' },
        { nombre: 'Homúnculo', rol: 'Inteligencia artificial pura', descripcion: 'Ser creado en una probeta por Wagner que busca desesperadamente encarnar en un cuerpo material en el mar.' }
      ],
      temasClave: [
        { titulo: 'El espíritu faústico y la salvación por la acción', explicacion: 'El hombre no se condena por errar o dudar, sino por la pereza y el estancamiento; la redención premia el esfuerzo incansable hacia la superación y el bien común.' },
        { titulo: 'El Eterno Femenino (Das Ewig-Weibliche)', explicacion: 'El amor desinteresado, espiritual y compasivo encarnado en Margarita y la Virgen María que eleva al alma humana por encima de las trampas del orgullo y la razón fría.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Obra cumbre de la literatura alemana y del genio de Goethe. Recrea el pacto del sabio Fausto con el diablo Mefistófeles a lo largo de dos partes monumentales: la tragedia amorosa de Margarita en la tierra y la travesía cósmica por el clasicismo y la acción social, culminando en la salvación del alma del sabio por el Eterno Femenino.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Poema dramático / tragedia filosófica' },
        { clave: 'Autor', valor: 'Johann Wolfgang von Goethe (Fráncfort del Meno / Weimar)' },
        { clave: 'Publicación en dos partes', valor: 'Parte I (1808, centrada en el individuo) / Parte II (1832, póstuma, alegórico-universal)' },
        { clave: 'Frase del pacto', valor: '"¡Deténte, eres tan hermoso!" (Verweile doch! du bist so schön!)' },
        { clave: 'Definición de Mefistófeles', valor: '"Una parte de aquella fuerza que siempre quiere el mal y siempre obra el bien"' }
      ],
      elementosClave: [
        { titulo: 'El caballo de batalla preuniversitario', contenido: 'Ambas partes son una unidad conceptual: Fausto no se salva por sus méritos puros sino por la conjunción de su lucha incansable con la gracia del amor divino.' },
        { titulo: 'Euforión y el homenaje a Byron', contenido: 'El hijo de Fausto y Helena representa el ideal romántico moderno que perece trágicamente por su afán de volar sin mesura.' },
        { titulo: 'La ceguera física final', contenido: 'La Dama Preocupación lo deja ciego, pero en su ceguera exterior adquiere la suprema visión interior de un pueblo libre ganando el suelo al mar.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Mefistófeles pierde el alma de Fausto a pesar de que este pronunció las palabras del pacto?',
          respuesta: 'Porque Fausto no pronunció la frase extasiado por un placer egoísta o carnal procurado por el diablo, sino vislumbrando el porvenir de una humanidad libre y trabajadora, y porque el amor de Margarita y la gracia divina intercedieron por él.'
        },
        {
          pregunta: '¿Cuál es el significado del "Eterno Femenino" que cierra el drama?',
          respuesta: 'Es el principio cósmico de amor, compasión y belleza espiritual que rescata al alma humana de las garras del materialismo y la eleva a la comunión divina.'
        }
      ]
    }
  },
  {
    id: 'romeo-y-julieta',
    titulo: 'Romeo y Julieta',
    autor: 'William Shakespeare',
    año: '1597',
    pais: 'Inglaterra',
    genero: 'Dramático',
    especie: 'Tragedia lírica',
    corriente: 'Renacimiento Inglés (Teatro Isabelino)',
    temaPrincipal: 'El amor apasionado juvenil que desafía el odio ciego y ancestral de las familias, truncado por la fatalidad del destino adverso.',
    portadaGradiente: 'linear-gradient(145deg, #831843 0%, #be185d 50%, #500724 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'En la ciudad italiana de Verona, el odio inveterado entre dos linajes aristocráticos rivales, los Montesco y los Capuleto, tiñe periódicamente las calles de sangre. En una fiesta de máscaras en el palacio Capuleto, el joven Romeo Montesco conoce a la doncella Julieta Capuleto y ambos se enamoran instantáneamente con una pasión fulgurante. Con el auxilio de Fray Lorenzo, quien confía en que su enlace selle la reconciliación de las familias, los jóvenes contraen matrimonio secreto. Sin embargo, la fatalidad estalla cuando Teobaldo Capuleto asesina a Mercucio y Romeo mata a Teobaldo en represalia, siendo desterrado a Mantua. Para evitar un matrimonio forzado con el conde Paris, Julieta bebe una pócima que finge su muerte durante cuarenta y dos horas; la carta que debía informar a Romeo del ardid no llega a causa de la peste, empujando al joven a suicidarse con veneno en la cripta fúnebre, tras lo cual Julieta despierta y se atraviesa el pecho con la daga de su amado, consumando la reconciliación tardía de los dos linajes sobre las tumbas de sus hijos.',
      contextoHistorico: 'Estrenada en Londres en 1597, inspirada en poemas narrativos de Arthur Brooke y novelle italianas de Mateo Bandello. Máxima cumbre poética del amor juvenil en la literatura universal.',
      analisisTrama: [
        {
          titulo: 'El odio en las calles de Verona y el baile de máscaras (Acto I)',
          detalle: 'La tragedia comienza con un prólogo en soneto recitado por el Coro anunciando la disputa secular de dos familias de igual dignidad en Verona. En la plaza pública estalla una sangrienta riña entre criados de los Montesco y los Capuleto, atizada por el belicoso Teobaldo; el príncipe Escalo interviene de urgencia con su guardia y promulga un edicto irrevocable: quien vuelva a quebrar la paz civil pagará con su vida. Mientras tanto, el joven Romeo deambula melancólico sufriendo por el desdén de Rosalina. Para distraerlo, su primo Benvolio y su ingenioso amigo Mercucio lo convencen de acudir enmascarados a un banquete nocturno ofrecido por el señor Capuleto. Allí Romeo divisa a Julieta Capuleto y queda deslumbrado ("¿Mi corazón ha amado hasta este instante? Jamás mis ojos vieron la verdadera hermosura"). Se acercan y dialogan entrelazando las manos en un célebre diálogo en forma de soneto donde se tratan de peregrino y santa, sellando su primer beso. Al finalizar la fiesta descubren con horror que pertenecen a las familias enemigas juradas.'
        },
        {
          titulo: 'La escena del balcón y la boda clandestina (Acto II)',
          detalle: 'Burlando a sus amigos que lo buscan por las calles, Romeo salta la tapia del jardín de los Capuleto y contempla a Julieta asomada a su balcón iluminada por la luna. En su soliloquio, Julieta cuestiona la tiranía de los nombres feudales ("¡Oh Romeo, Romeo! ¿Por qué eres tú Romeo? Reniega de tu padre y de tu nombre; o si no quieres, júrame tu amor y yo dejaré de ser una Capuleto... ¿Qué hay en un nombre? Lo que llamamos rosa no dejaría de despedir su dulce fragancia si tuviera otro nombre"). Romeo emerge de la penumbra y le jura su amor eterno. Conmovidos, pactan casarse en secreto al día siguiente. Romeo acude de madrugada a la celda de Fray Lorenzo, sacerdote franciscano y botánico aficionado, quien acepta oficiar el sacramento matrimonial convencido de que la unión bendecida de los dos muchachos extirpará el odio ancestral de las dos familias. Con la ayuda cómplice del ama de cría de Julieta, la ceremonia nupcial se celebra en el convento en la más estricta intimidad.'
        },
        {
          titulo: 'La reyerta mortal: Mercucio, Teobaldo y el destierro de Romeo (Acto III)',
          detalle: 'Apenas celebrada la boda, la fatalidad destruye toda esperanza de dicha. En una plaza sofocante, Teobaldo busca a Romeo para batirse con él; Romeo se niega a pelear y le dirige palabras afectuosas tratándolo como pariente querido. Indignado por lo que considera una cobarde sumisión de su amigo, el impulsivo Mercucio desenvaina su espada y reta a Teobaldo. Romeo intenta separarlos colocándose entre ambos; Teobaldo estira el brazo por debajo del pecho de Romeo y atraviesa el costado de Mercucio huyendo cobardemente. En su agonía burlona, Mercucio maldice a ambos bandos ("¡La peste caiga sobre vuestras dos casas! Han hecho de mí comida para gusanos"). Cegado por la culpa y la furia ante la muerte de su camarada, Romeo persigue a Teobaldo y lo atraviesa con su espada dejándolo muerto en la arena. El príncipe Escalo llega al lugar y conmuta la pena capital por el destierro perpetuo de Romeo fuera de Verona bajo pena de ejecución inmediata si es hallado en sus murallas. Tras pasar una noche nupcial desgarradora y clandestina en los aposentos de Julieta ("No es la alondra, es el ruiseñor el que canta"), Romeo escapa a la ciudad de Mantua.'
        },
        {
          titulo: 'La imposición del matrimonio con Paris y el narcótico de Fray Lorenzo (Acto IV)',
          detalle: 'Desconociendo que su hija ya está casada, el señor Capuleto pacta formalmente la boda inmediata de Julieta con el acaudalado y noble conde Paris para consolar a la familia por la muerte de Teobaldo. Ante la negativa desesperada de la muchacha, su padre arde en cólera amenazándola con desheredarla, echarla a la calle y dejarla morir en el arroyo; el ama le aconseja cínicamente olvidar al desterrado Romeo y casarse con Paris. Desesperada, Julieta corre a la celda de Fray Lorenzo dispuesta a suicidarse con una daga si no halla remedio. El fraile idea una arriesgada estratagema médica: le entrega un frasco con una pócima que induce un estado cataléptico idéntico a la muerte durante cuarenta y dos horas (cesará su pulso, su piel empalidecerá y su cuerpo quedará rígido como un cadáver); su familia la creerá muerta y la depositará en la cripta ancestral de los Capuleto, mientras él enviará una carta urgente a Romeo a Mantua para que acuda a tiempo a rescatarla de la tumba cuando despierte y huir juntos. La noche antes de la boda forzada, Julieta bebe con valentía el brebaje; al amanecer, el ama la encuentra inerte en su lecho y el festejo nupcial se muda en un desgarrador duelo funerario.'
        },
        {
          titulo: 'La carta interceptada por la peste y el suicidio doble en la cripta (Acto V)',
          detalle: 'El azar trágico anula el plan: una mortífera epidemia de peste azota las aldeas de camino a Mantua y las autoridades sanitarias ponen en cuarentena obligatoria al fraile mensajero, fray Juan, impidiendo que la carta llegue a manos de Romeo. En cambio, su criado Baltasar llega a Mantua con la noticia espantosa de que ha visto enterrar a Julieta en el panteón familiar. Enloquecido de dolor, Romeo compra un veneno letal a un mísero boticario arruinado y cabalga sin descanso hacia Verona. Al llegar a la medianoche al cementerio, el conde Paris, que depositaba flores en la tumba, lo confunde con un profanador y lo enfrenta espada en mano; Romeo lo mata en defensa propia. Al abrir la cripta, contempla a Julieta resplandeciente en su belleza intacta ("¡La muerte, que ha succionado la miel de tu aliento, no ha tenido poder sobre tu hermosura!"). Abraza a su amada, bebe la pócima ponzoñosa y cae muerto a su lado exclamando: "¡Así, con un beso, muero!". Segundos después concluye el efecto del narcótico y Julieta despierta. Al ver el cadáver tibio de Romeo y la copa vacía en su mano, intenta beber los restos de veneno de sus labios; al no hallar suficiente, desenvaina la daga de Romeo de su cinto y se la clava en el corazón proclamando: "¡Oh feliz puñal! ¡Esta es tu vaina; enmohece allí y déjame morir!". Fray Lorenzo llega demasiado tarde y presencia la carnicería. Alertados por los guardias, el príncipe Escalo, los ancianos señores Montesco y Capuleto acuden a la cripta. Fray Lorenzo relata con lágrimas toda la verdad; conmovidos y avergonzados por el costo sangriento de su odio, Capuleto y Montesco estrechan sus manos en reconciliación perpetua y pactan erigir en Verona dos estatuas de oro macizo en honor de la fidelidad y la hermosura de los dos jóvenes amantes.'
        }
      ],
      personajes: [
        { nombre: 'Romeo Montesco', rol: 'Protagonista apasionado', descripcion: 'Joven noble e impetuoso cuya visión romántica y pureza afectiva lo precipitan a la inmolación por amor.' },
        { nombre: 'Julieta Capuleto', rol: 'Heroína trágica', descripcion: 'Muchacha de casi catorce años que madura vertiginosamente desafiando el orden patriarcal con valentía moral y entereza.' },
        { nombre: 'Fray Lorenzo', rol: 'Sacerdote mediador', descripcion: 'Religioso y sabio boticario que actúa con rectitud pastoral buscando la paz civil, superado por el azar y la fatalidad cósmica.' },
        { nombre: 'Mercucio', rol: 'Espíritu libre e ingenioso', descripcion: 'Pariente del príncipe y amigo de Romeo, dueño de un humor cínico y brillante cuya muerte desata la catástrofe.' },
        { nombre: 'Teobaldo Capuleto', rol: 'Encarnación del odio fratricida', descripcion: 'Primo belicoso de Julieta ("El rey de los gatos") que no tolera la convivencia pacífica con los rivales.' }
      ],
      temasClave: [
        { titulo: 'El amor como fuerza cósmica versus el odio social', explicacion: 'La pasión lírica de los amantes es pura e inocente, pero se estrella contra las cadenas de la discordia feudal de sus linajes.' },
        { titulo: 'El destino adverso (Star-crossed lovers)', explicacion: 'La tragedia está signada por la mala estrella y la coincidencia fatal de los minutos (la peste, el retraso del mensajero, el despertar a destiempo).' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la tragedia amorosa occidental. Narra el romance clandestino entre Romeo Montesco y Julieta Capuleto en Verona, miembros de dos familias enfrentadas por odios ancestrales, cuyo desenlace trágico con veneno y daga en la cripta familiar sella la reconciliación tardía de sus linajes.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Tragedia lírica' },
        { clave: 'Autor', valor: 'William Shakespeare (Stratford-upon-Avon, Inglaterra)' },
        { clave: 'Estructura formal', valor: 'Cinco actos escritos en verso blanco y prosa poética' },
        { clave: 'Escenario de la acción', valor: 'Verona y Mantua (norte de Italia)' },
        { clave: 'Edad de la protagonista', valor: 'Casi catorce años (a punto de cumplir la fiesta de San Pedro ad Víncula)' }
      ],
      elementosClave: [
        { titulo: 'El prólogo en soneto', contenido: 'Anticipa toda la trama ante el público declarando que la muerte de los dos amantes "signados por las estrellas" sepultará el rencor de los padres.' },
        { titulo: 'La metáfora del ruiseñor y la alondra', contenido: 'En el lecho de amor matutino: el canto del ruiseñor representa la noche y la dicha, mientras el canto de la alondra anuncia el día y el peligro del destierro.' },
        { titulo: 'La culpa de la peste', contenido: 'La carta no llega porque las autoridades cerraron el convento de fray Juan por sospecha de contagio pestilente, no por negligencia del mensajero.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Romeo se niega inicialmente a batirse en duelo con Teobaldo?',
          respuesta: 'Porque acababa de casarse en secreto con Julieta en la celda de Fray Lorenzo y consideraba a Teobaldo como un pariente querido a quien amaba por el lazo sagrado.'
        },
        {
          pregunta: '¿Qué monumento erigen los padres al final de la obra para inmortalizar su arrepentimiento?',
          respuesta: 'Dos estatuas de oro puro en el centro de Verona para recordar a los dos amantes y la reconciliación definitiva de los Montesco y los Capuleto.'
        }
      ]
    }
  },
  {
    id: 'otelo',
    titulo: 'Otelo, el moro de Venecia',
    autor: 'William Shakespeare',
    año: '1604',
    pais: 'Inglaterra',
    genero: 'Dramático',
    especie: 'Tragedia',
    corriente: 'Renacimiento Inglés (Teatro Isabelino)',
    temaPrincipal: 'La manipulación psicológica perversa, la envidia ponzoñosa y la destrucción provocada por los celos irracionales.',
    portadaGradiente: 'linear-gradient(145deg, #111827 0%, #374151 50%, #030712 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Otelo, un valeroso general moro al servicio de la República de Venecia, se casa en secreto con la bella y virtuosa dama Desdémona, hija del influyente senador Brabancio. Al estallar la amenaza bélica turca contra la isla de Chipre, Otelo es enviado como gobernador militar junto a su leal lugarteniente Miguel Casio y su alférez Yago. Corroído por el resentimiento al haber sido postergado en el ascenso militar en favor de Casio y por envidia visceral ante la nobleza de Otelo, Yago urde una maquiavélica tela de araña: insinúa gota a gota que Desdémona mantiene un romance adúltero clandestino con Casio. Valiéndose del robo accidental de un pañuelo de boda bordado con fresas (el primer regalo de amor de Otelo), Yago fabrica pruebas falsas que enloquecen de celos al general moro. Convencido de la traición, Otelo asfixia a Desdémona en su lecho nupcial; al descubrir la monstruosa farsa gracias a la confesión de Emilia (esposa de Yago), Otelo se suicida con su propia daga cayendo sobre el cadáver de su amada inocente.',
      contextoHistorico: 'Representada en Londres ante la corte real en 1604. Adaptada de un relato de los Ecatommiti de Giraldi Cinthio. Es el estudio dramático más perturbador de la literatura universal sobre la génesis del mal gratuito y el delirio de los celos.',
      analisisTrama: [
        {
          titulo: 'El matrimonio secreto y el juicio ante el Senado de Venecia (Acto I)',
          detalle: 'En las oscuras callejuelas de Venecia, el alférez Yago y el joven noble Rodrigo vociferan bajo las ventanas del senador Brabancio anunciándole que su única hija, Desdémona, ha huido de casa para entregarse en matrimonio al "viejo carnero negro", el general moro Otelo. Furioso, Brabancio moviliza guardias armados y acusa a Otelo ante el Dux y los senadores reunidos en consejo de emergencia, afirmando que sedujo a su hija mediante hechizos, filtros mágicos y brujería pagana. Otelo se defiende con elocuencia serena: relata que la única magia que empleó fue narrarle a Desdémona las penalidades, batallas y naufragios de su vida militar ("Ella me amó por los peligros que pasé, y yo la amé por la compasión que me demostró"). Desdémona comparece en la sala y ratifica su amor conyugal ante su padre. El Senado absuelve al héroe y le encomienda el mando supremo de la flota para defender Chipre de la armada del Imperio Otomano.'
        },
        {
          titulo: 'La llegada a Chipre y la emboscada alcohólica contra Casio (Acto II)',
          detalle: 'Al llegar a Chipre, se confirma que una terrible tempestad marítima ha dispersado y destrozado las naves de la flota turca, disipando la amenaza de guerra. Se decreta una noche de fiesta popular y celebración. Yago pone en marcha su conspiración: embriaga a Miguel Casio pese a la reticencia de este e incita a Rodrigo a provocarlo; Casio se traba en una pelea a espada hiriendo al exgobernador Montano. Alertado por la campana de rebato, Otelo acude en persona y exige explicaciones; Yago finge con hipocresía defender a Casio con palabras dolidas, logrando exactamente el efecto contrario: Otelo destituye a Casio de su rango militar de lugarteniente con severidad irrevocable ("Casio, te amo, pero jamás volverás a ser uno de mis oficiales"). Yago aconseja entonces al desesperado Casio que acuda a la bondadosa Desdémona para que interceda ante Otelo por su perdón.'
        },
        {
          titulo: 'La siembra del veneno de los celos y el robo del pañuelo (Acto III)',
          detalle: 'Desdémona intercede con candorosa insistencia ante su esposo a favor de Casio. Observando la escena desde la distancia, Yago lanza sus primeros dardos psicológicos con maestría ponzoñosa: suelta suspiros fingidos, retiene frases a medias y siembra sospechas ("¡Ah, no me gusta eso!... ¡Cuidado, señor mío, con los celos! Es el monstruo de ojos verdes que se burla de la carne de que se nutre"). La mente honesta de Otelo empieza a quebrarse ante las sutiles insinuaciones de que una dama veneciana que engañó a su propio padre bien puede burlar a un extranjero moro. En un descuido, a Desdémona se le cae un pañuelo de seda fina bordado con fresas (el primer obsequio de boda que Otelo le dio, tejido por una sibila egipcia con hilo mágico); Emilia, esposa de Yago y criada de Desdémona, lo recoge para complacer a su marido ignorando su fin maquiavélico. Yago toma la prenda y la deja caer sigilosamente en las habitaciones de Casio para fabricar la prueba concluyente.'
        },
        {
          titulo: 'La prueba falsificada y la orden de degüello (Actos III y IV)',
          detalle: 'Otelo exige a Yago pruebas materiales palpables ("¡Dame una prueba visual de su infidelidad, o por el cielo eterno que harías mejor naciendo perro!"). Yago inventa un falso sueño lascivo de Casio y le revela que ha visto al lugarteniente limpiarse la barba con el mismísimo pañuelo de Desdémona. Desesperado, Otelo pide a Desdémona su pañuelo; al no poder mostrárselo, el general sufre un ataque epiléptico cayendo inconsciente al suelo. Yago organiza una escena de espionaje calculada: coloca a Otelo oculto tras una columna mientras conversa en voz baja con Casio sobre la cortesana Bianca; al escuchar las risas y bromas de Casio y ver llegar a Bianca furiosa arrojando el pañuelo bordado a la cara de Casio, Otelo concluye que se burlan descaradamente de su deshonra. Cegado por el odio, Otelo abofetea públicamente a Desdémona en presencia de los embajadores venecianos recién llegados y jura asfixiarla en su lecho nupcial mientras encarga a Yago asesinar a Casio.'
        },
        {
          titulo: 'El asesinato en la alcoba y la confesión heroica de Emilia (Acto V)',
          detalle: 'De noche en el dormitorio conyugal, Desdémona canta con tristeza premonitoria la balada del Sauce que escuchó en su infancia a una criada que murió de pena. Otelo entra a la habitación con una vela encendida; contemplando a la joven dormida pronuncia su conmovedor monólogo ("¡Es la causa, es la causa, alma mía!... Apagaré esta antorcha y luego apagaré tu luz"). La despierta y le conmina a confesar sus pecados y rezar porque va a matarla; Desdémona suplica por su inocencia y niega el adulterio con lágrimas, pero Otelo, sordo a la verdad, la asfixia con una almohada hasta dejarla inmóvil. Emilia golpea la puerta clamando auxilio y anuncia que Casio ha sobrevivido a un atentado y que Rodrigo ha muerto. Al ver el cadáver de su señora, Emilia grita con desgarrador espanto. Otelo justifica el homicidio afirmando que el honesto Yago descubrió la traición con el pañuelo; Emilia palidece y desenmascara la verdad revelando a voz en cuello que ella misma encontró el pañuelo y se lo dio a Yago a petición suya. Yago irrumpe y conmina a callar a su esposa con amenazas de muerte; Emilia desafía a su marido proclamando la pureza de Desdémona, y Yago le atraviesa el pecho con su espada matándola ante la corte. Otelo comprende la atroz pesadilla en que se ha sumergido: hiere a Yago en una pierna ("Miro sus pies para ver si tiene pezuñas hendidas de demonio, pero no lo mato; prefiero que viva sufriendo"), pronuncia su último discurso solicitando que lo recuerden como "uno que amó no sabiamente sino con demasiada pasión; uno no fácilmente celoso, pero una vez perplejo, llevado a extremos insondables", y con una daga turca oculta se descerraja un golpe en el pecho cayendo muerto sobre el cuerpo inerte de Desdémona. Yago es encadenado para ser sometido a torturas públicas y Casio asume el gobierno civil de Chipre.'
        }
      ],
      personajes: [
        { nombre: 'Otelo', rol: 'General moro de Venecia', descripcion: 'Guerrero noble, honorable y candoroso cuya falta de malicia mundana lo convierte en presa fácil de la sugestión perversa de los celos.' },
        { nombre: 'Yago', rol: 'Alférez intrigante ("El honesto Yago")', descripcion: 'Arquetipo universal de la perversidad maquiavélica, la envidia ponzoñosa y el cinismo destructor que destruye la belleza por puro rencor moral.' },
        { nombre: 'Desdémona', rol: 'Esposa virtuosa e inocente', descripcion: 'Dama noble, dulce e incorruptible cuyo amor sacrificado y sincero es trágicamente incomprendido.' },
        { nombre: 'Miguel Casio', rol: 'Lugarteniente noble', descripcion: 'Militar cortés, apuesto e ingenuo, utilizado como cebo involuntario de la intriga por su propia caballerosidad.' },
        { nombre: 'Emilia', rol: 'Esposa de Yago y defensora de la verdad', descripcion: 'Mujer de temple y sentido común que desenmascara la calumnia de su marido al precio de su propia vida.' }
      ],
      temasClave: [
        { titulo: 'El monstruo de los celos (The green-eyed monster)', explicacion: 'La inseguridad existencial del individuo que desconfía de su propio valor proyectando culpas imaginarias sobre el ser amado.' },
        { titulo: 'La manipulación verbal como arma letal', explicacion: 'Yago no utiliza espadas ni ejércitos para destruir a Otelo: utiliza el poder destructivo de la palabra ambigua, los silencios y las pausas calculadas.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Tragedia cumbre de Shakespeare sobre los celos. Recrea la caída moral del general Otelo, inducido por la intriga maquiavélica de su alférez Yago a creer en la supuesta infidelidad de su virtuosa esposa Desdémona, a quien asfixia en el lecho conyugal antes de suicidarse al descubrir la verdad.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Tragedia clásica' },
        { clave: 'Autor', valor: 'William Shakespeare (Londres / Stratford-upon-Avon)' },
        { clave: 'Estructura formal', valor: 'Cinco actos continuos' },
        { clave: 'Escenarios geográficos', valor: 'Venecia (Acto I) y la isla de Chipre (Actos II al V)' },
        { clave: 'Objeto catalizador del drama', valor: 'El pañuelo de seda blanca bordado con fresas' }
      ],
      elementosClave: [
        { titulo: 'La balada del Sauce', contenido: 'Canción fúnebre y premonitoria que canta Desdémona en su lecho antes de ser asfixiada por su esposo.' },
        { titulo: 'La tipología de Yago', contenido: 'Encarna el mal gratuito (sin justificación proporcionada), impulsado por el rencor contra la superioridad moral de los hombres nobles.' },
        { titulo: 'El suicidio heroico de Otelo', contenido: 'Se juzga y ejecuta a sí mismo como justicia poética: se castiga como castigó a los enemigos de Venecia.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué el pañuelo con fresas es crucial en la intriga de Yago?',
          respuesta: 'Porque fue el primer regalo sagrado de amor que Otelo entregó a Desdémona, con valor casi religioso de fidelidad; al hallarlo en posesión de Casio, Otelo toma la mentira como una certeza irrefutable.'
        },
        {
          pregunta: '¿Quién revela finalmente la inocencia de Desdémona y el complot de Yago?',
          respuesta: 'Emilia, la criada de Desdémona y esposa del propio Yago, quien confiesa haber recogido el pañuelo sin saber las maquiavélicas intenciones de su marido, muriendo acuchillada por este.'
        }
      ]
    }
  },
  {
    id: 'la-eneida',
    titulo: 'La Eneida',
    autor: 'Virgilio',
    año: '29 - 19 a. C.',
    pais: 'Imperio Romano',
    genero: 'Épico',
    especie: 'Epopeya culta nacional',
    corriente: 'Clasicismo Latino (Siglo de Augusto)',
    temaPrincipal: 'La misión providencial del héroe troyano Eneas en la fundación mítica del linaje de Roma y la exaltación del deber sagrado (pietas).',
    portadaGradiente: 'linear-gradient(145deg, #7f1d1d 0%, #b91c1c 50%, #450a0a 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Tras la destrucción de Troya por los griegos mediante el engaño del caballo de madera, el príncipe Eneas huye de las llamas cargando a su anciano padre Anquises en hombros y llevando de la mano a su pequeño hijo Ascanio. Guiado por los oráculos y obedeciendo el mandato de los dioses que le encomiendan fundar en Italia una nueva estirpe gloriosa (la futura Roma), navega por el Mediterráneo sufriendo la implacable cólera de la diosa Juno. Tras un trágico idilio en Cartago con la reina Dido (quien se suicida en la pira al ser abandonada por el héroe) y el descenso al inframundo en Cumas para recibir las profecías del destino imperial romano de manos de su padre difunto, Eneas desembarca en el Lacio. Allí se desata una cruenta guerra contra las tribus itálicas lideradas por el fiero Turno, rey de los rútulos; Eneas se impone en combate singular dando muerte a Turno, consagrando la alianza que dará nacimiento a la civilización romana.',
      contextoHistorico: 'Encargada directamente por el emperador César Augusto para legitimar el régimen imperial vinculando la gens Julia (a través de Ascanio/Iulo) con los dioses y con la nobleza troyana homérica. Virgilio dedicó sus últimos diez años a perfeccionar sus hexámetros, pidiendo en su lecho de muerte que el manuscrito fuera quemado por considerarlo inconcluso, orden que Augusto impidió.',
      analisisTrama: [
        {
          titulo: 'La tormenta de Juno, el naufragio en Cartago y el relato de la caída de Troya (Libros I - II)',
          detalle: 'La epopeya inicia in media res cuando las naves troyanas son dispersadas por una feroz tempestad enviada por Juno en el mar tirreno; Neptuno sosiega las aguas y los supervivientes encallan en las costas de Libia (Cartago). La reina Dido, viuda fenicia que construye la ciudadela de Cartago, acoge a los troyanos con generosidad. Venus envía a Cupido disfrazado de Ascanio para inflamar el corazón de la reina de un amor apasionado hacia Eneas. Durante el banquete, Dido suplica a Eneas que relate la caída de Troya. Eneas narra en el Libro II el ardid del caballo de madera abandonado por los griegos en la playa, la trampa del traidor Sinón y la muerte atroz del sacerdote Laocoonte y sus hijos estrangulados por serpientes marinas colosales. Al abrirse el caballo de noche, los griegos incendian Ilión; el espectro de Héctor se aparece a Eneas ordenándole huir con los dioses penates. En medio del horror, Eneas presencia el degüello del anciano rey Príamo a manos de Pirro en el altar; rescata a su padre Anquises y a su hijo Ascanio, pero su esposa Creúsa se extravía y muere en el incendio, apareciéndosele como sombra para profetizarle que una patria y una nueva esposa real lo aguardan en la tierra de Hesperia.'
        },
        {
          titulo: 'El idilio trágico con Dido y el mandato ineludible de Júpiter (Libros III - IV)',
          detalle: 'Tras narrar las errancias marítimas por Tracia, Creta y el estrecho de Escila (Libro III), se desata la tragedia de Dido en el célebre Libro IV. Instigada por su hermana Ana, la reina cede a su pasión por Eneas. Durante una cacería campestre desatada por una tormenta de lluvia, ambos se refugian en una cueva solitaria donde consuman su amor considerándolo matrimonio. Eneas se asienta en Cartago supervisando las obras de la ciudadela, olvidando su destino histórico. Airado ante el abandono del deber sagrado, Júpiter envía al mensajero Mercurio con una orden tajante: Eneas debe zarpar de inmediato hacia Italia porque su linaje debe reinar sobre el mundo entero. Destrozado por el deber moral pero fiel a la voluntad divina (pietas), Eneas ordena aprestar las naves en secreto. Al descubrirlo, Dido le reprocha con amargura su ingratitud y falsedad; Eneas le responde que no marcha por voluntad propia sino obligado por los dioses ("Italiam non sponte sequor"). Apenas zarpan las naves en la penumbra nocturna, Dido sube a una pira fúnebre donde ha colocado las ropas y armas de su amado, maldice a la futura estirpe de Eneas augurando un odio eterno y guerras inextinguibles entre Cartago y Roma (presagio de Aníbal Barca) y se atraviesa el pecho con la espada del príncipe troyano.'
        },
        {
          titulo: 'Los juegos en Sicilia y el descenso al Inframundo con la Sibila (Libros V - VI)',
          detalle: 'En Sicilia celebran juegos fúnebres solemnes en honor de Anquises fallecido un año antes (Libro V). Luego arriban a Cumas en Italia. En el monumental Libro VI (modelo directo de la Divina Comedia de Dante), Eneas consulta a la profetisa Sibila en su cueva sagrada. Tras arrancar la rama dorada de un árbol sagrado como tributo para Proserpina, descienden al Averno. Cruzan el río Aqueronte en la barca de Caronte y atraviesan los campos del llanto; allí Eneas divisa la sombra melancólica de Dido y le implora perdón entre lágrimas jurando que abandonó sus playas contra su voluntad; la reina lo mira con desprecio mudo y huye hacia el bosque junto a la sombra de su primer esposo Siqueo. Luego llegan a los Campos Elíseos donde reposan las almas justas; allí el espíritu de su padre Anquises le muestra el misterio de la reencarnación y despliega ante los ojos de Eneas el majestuoso desfile de los futuros héroes de Roma: los reyes albanos, Rómulo, los cónsules de la República y la gloria cumbre de César Augusto, pronunciando la misión universal del pueblo romano: "Tu regere imperio populos, Romane, memento... (Tú, romano, recuerda gobernar a los pueblos bajo tu imperio; imponer las leyes de la paz, perdonar a los sometidos y abatir a los soberbios)".'
        },
        {
          titulo: 'El arribo al Lacio, el pacto con Latino y la furia de Turno (Libros VII - IX)',
          detalle: 'Eneas desembarca en la desembocadura del río Tíber. El rey Latino lo recibe pacíficamente y, guiado por oráculos que le ordenaban casar a su hija Lavinia con un príncipe extranjero, le ofrece la mano de la princesa para fundar una nueva dinastía mixta. Sin embargo, la diosa Juno, enfurecida por el destino pacífico de los troyanos, envía a la Furia Alecto desde el Tártaro para incendiar los rencores de la reina Amata y de Turno, fiero monarca de los rútulos y prometido original de Lavinia. Turno alza en armas a los pueblos itálicos desatando una sangrienta contienda civil. Eneas remonta el río Tíber en busca de aliados y sella un pacto fraternal con el anciano rey arcadio Evandro, quien le encomienda a su joven y querido hijo Palante para que se adiestre bajo su mando en la guerra. El dios herrero Vulcano fabrica para Eneas una armadura divina y un escudo portentoso cincelado con las grandes victorias del futuro de Roma (la batalla de Accio donde Augusto derrota a Marco Antonio y Cleopatra).'
        },
        {
          titulo: 'La muerte de Palante, el dolor de Eneas y el duelo final contra Turno (Libros X - XII)',
          detalle: 'Estalla el combate salvaje entre rútulos y troyanos (Libro X). En la refriega, el gigante Turno mata en duelo singular al joven e inexperto príncipe Palante; lleno de soberbia, Turno despoja el cadáver del muchacho arrancándole un pesado tahalí de oro bordado con la matanza de las Danaides y se lo ciñe al hombro jactancioso. La noticia llena a Eneas de una furia justiciera incontenible. Se pacta finalmente dirimir la contienda en un combate singular entre Eneas y Turno para evitar el derramamiento de sangre inocente (Libro XII). Aunque la ninfa Juturna (hermana de Turno) intenta reanudar la batalla campal, Eneas herido persigue implacablemente a Turno por el campo. Acorralado ante las murallas de Laurento, Turno intenta arrojar una colosal roca que sus brazos debilitados apenas logran mover. Eneas dispara su formidable lanza de guerra atravesando las siete capas del escudo de Turno y clavándola profundamente en su muslo; el caudillo rútulo cae derribado en tierra. Turno alza la mano implorando piedad y reconoce la victoria de Eneas, pidiéndole que entregue su cadáver a su anciano padre Dauno y consintiendo que despose a Lavinia. Eneas titubea y está a punto de perdonarle la vida; pero en ese instante sus ojos divisan en el hombro del vencido el tahalí de oro robado al infortunado Palante. Ardiendo en cólera justiciera, Eneas exclama con voz terrible: "¡Es Palante quien con este golpe te inmola y toma venganza de tu sangre infame!". Hunde con furia su espada en el pecho de Turno, cuya alma huye con un gemido de indignación hacia las sombras del inframundo.'
        }
      ],
      personajes: [
        { nombre: 'Eneas', rol: 'Héroe protagonista troyano', descripcion: 'Hijo de la diosa Venus y el mortal Anquises, encarnación de la pietas (sumisión devota a los dioses, al deber sagrado, a la familia y a la patria).' },
        { nombre: 'Dido (Elisa)', rol: 'Reina de Cartago', descripcion: 'Soberana valerosa y apasionada cuya hospitalidad deviene en tragedia pasional y maldición histórica hacia Roma tras el abandono de Eneas.' },
        { nombre: 'Turno', rol: 'Rey de los rútulos y antagonista', descripcion: 'Guerrero indómito y soberbio que defiende sus derechos nupciales sobre Lavinia, encarnación del furor bélico primitivo que Roma debe someter.' },
        { nombre: 'Anquises', rol: 'Padre y guía moral', descripcion: 'Anciano respetado que encarna la memoria del linaje troyano y desvela a Eneas en el Hades la misión imperial universal de Roma.' },
        { nombre: 'Ascanio (Iulo)', rol: 'Hijo y promesa dinástica', descripcion: 'Niño troyano que personifica el futuro del imperio y funda la ciudadela de Alba Longa, raíz directa de la gens Julia.' }
      ],
      temasClave: [
        { titulo: 'La Pietas como virtud suprema', explicacion: 'La subordinación de las pasiones individuales egoístas (el amor con Dido) ante el llamamiento ético y providencial del bien común colectivo.' },
        { titulo: 'El destino ecuménico de Roma (Fatum)', explicacion: 'La historia no es azar caótico; es un designio providencial orientado a la pacificación jurídica y civil de los pueblos bajo la Pax Romana.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Epopeya cumbre de la literatura latina encargada por César Augusto a Virgilio. Narra la huida de Eneas de Troya, su trágico romance con Dido en Cartago, su descenso profético al Averno y la guerra en el Lacio contra Turno para fundar la estirpe fundadora del Imperio Romano.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Épico — Epopeya culta nacional' },
        { clave: 'Autor', valor: 'Publio Virgilio Marón ("El Cisne de Mantua")' },
        { clave: 'Estructura formal', valor: '12 libros en hexámetros dactílicos' },
        { clave: 'Bipartición homérica', valor: 'Libros I al VI (odiseicos: viajes y tempestades) / Libros VII al XII (ilíadicos: guerras y duelos)' },
        { clave: 'Frase de sumisión divina', valor: '"Italiam non sponte sequor" (No voy a Italia por mi voluntad)' }
      ],
      elementosClave: [
        { titulo: 'El caballo de Troya en el Libro II', contenido: 'La narración más famosa de la caída de Troya en la literatura universal no está en La Ilíada sino en el relato de Eneas a Dido en La Eneida.' },
        { titulo: 'El escudo de Eneas', contenido: 'Hefesto/Vulcano forja en el escudo las hazañas del porvenir romano, con la batalla de Accio en el centro de la escena.' },
        { titulo: 'La maldición de Dido', contenido: 'Justificación mítica de las Guerras Púnicas entre Roma y Cartago anunciando el nacimiento del vengador Aníbal.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Eneas abandona a la reina Dido si estaba enamorado de ella?',
          respuesta: 'Porque el dios Júpiter le envió al mensajero Mercurio para ordenarle de forma terminante que no sacrificara el destino sagrado de su linaje y marchara de inmediato a fundar Roma en Italia.'
        },
        {
          pregunta: '¿Qué detalle visual detona que Eneas remate a Turno en el duelo final en vez de perdonarlo?',
          respuesta: 'Divisar ceñido sobre el hombro de Turno el tahalí de oro que este le había despojado al joven Palante tras matarlo en combate.'
        }
      ]
    }
  },
  {
    id: 'antigona',
    titulo: 'Antígona',
    autor: 'Sófocles',
    año: '441 a. C.',
    pais: 'Grecia Clásica',
    genero: 'Dramático',
    especie: 'Tragedia griega',
    corriente: 'Clasicismo Griego (Siglo de Pericles)',
    temaPrincipal: 'El conflicto ético irreductible entre las leyes divinas inmutables de la piedad familiar y las leyes positivas del Estado autoritario.',
    portadaGradiente: 'linear-gradient(145deg, #1e1b4b 0%, #3730a3 50%, #312e81 100%)',
    categoria: 'Literatura Universal',
    resumenDetallado: {
      sinopsis: 'Tras la sangrienta guerra civil de Tebas provocada por la maldición de Edipo, los dos hermanos varones, Eteocles y Polinices, mueren dándose muerte mutua frente a las murallas. El nuevo rey y regente, Creonte, asume el poder y promulga un severo decreto: Eteocles recibirá sepultura sagrada con máximos honores heroicos, mientras el cadáver del traidor Polinices deberá permanecer insepulto a la intemperie para ser despedazado por aves rapaces y perros carroñeros, bajo pena de muerte por lapidación a quien intente honrarlo. Su hermana Antígona, guiada por el deber sagrado de la piedad fraternal y el respeto a las leyes no escritas de los dioses, desobedece abiertamente la orden real y cubre el cadáver de su hermano con tierra ritual. Es capturada y condenada por Creonte a ser encerrada viva en una tumba de piedra en el desierto. Pese a las advertencias de su hijo Hemón (prometido de Antígona) y del adivino ciego Tiresias, la soberbia tiránica de Creonte no retrocede a tiempo: al abrir el sepulcro halla a Antígona ahorcada; Hemón se suicida con su espada abrazando el cuerpo de su amada; y la reina Eurídice se quita la vida en palacio maldiciendo al rey déspota, dejando a Creonte destruido en vida por el peso de su propia soberbia.',
      contextoHistorico: 'Representada en Atenas durante las Grandes Dionisíacas en el año 441 a. C. Culminación dramática del Ciclo Tebano de Sófocles, pieza clave en la historia del derecho y la filosofía moral sobre los límites de la obediencia debida al poder civil.',
      analisisTrama: [
        {
          titulo: 'El edicto de Creonte y el juramento secreto de Antígona (Prólogo)',
          detalle: 'Al alba, frente a las puertas del palacio de Tebas, Antígona e Ismene conversan en secreto sobre la desgracia que pesa sobre su linaje tras la muerte de sus dos hermanos en la contienda fratricida. Antígona le informa a Ismene sobre el implacable decreto recién promulgado por su tío Creonte: Eteocles ha sido enterrado con solemnidad militar, pero Polinices yace insepulto en el campo para ser devorado por los buitres, bajo pena de ejecución pública a pedradas. Antígona invita a su hermana a rebelarse juntas para darle sepultura; Ismene, sumisa y temerosa, rehúsa con dolor recordándole la debilidad de su condición de mujeres ante las leyes impuestas por los gobernantes masculinos. Indignada ante la cobardía de su hermana, Antígona proclama que cumplirá su deber sagrado sola: "Yo enterraré a mi hermano; hermoso será morir cumpliendo este deber; descansaré junto a aquel a quien amo, habiendo cometido un santo crimen".'
        },
        {
          titulo: 'La proclamación de Creonte y la noticia de la profanación (Episodio I)',
          detalle: 'Creonte se presenta solemnemente ante el Coro de ancianos tebanos exponiendo su doctrina de Estado: el gobernante que antepone los vínculos de sangre a la seguridad y la ley de la patria es indigno de mandar; por ello, quien traicionó a su tierra natal aliándose con ejércitos extranjeros merece pudrirse a la intemperie. Instantes después, un guardia de la patrulla del desierto acude temblando con una noticia pasmosa: alguien ha burlado la vigilancia, ha esparcido polvo seco sobre el cadáver de Polinices y ha realizado las libaciones prescritas antes de desaparecer como un fantasma. Creonte arde en furia acusando al guardia de complicidad sobornada con oro por enemigos políticos y lo amenaza con la tortura en el potro si no atrapa al criminal de inmediato.'
        },
        {
          titulo: 'La captura de Antígona y el gran choque dialéctico del derecho (Episodio II)',
          detalle: 'El centinela regresa exultante conduciendo a Antígona prisionera. Relata cómo desnudaron el cadáver putrefacto del polvo y aguardaron ocultos; tras una tormenta de arena repentina, divisaron a la doncella gimiendo como un pájaro herido al ver a su hermano al descubierto y vertiendo tres veces licor sobre el cuerpo desde una vasija de bronce. Interrogada con severidad por Creonte sobre si conocía el edicto que prohibía sus actos, Antígona pronuncia uno de los parlamentos más universales de la tragedia clásica: "Sí, lo conocía. No fue Zeus quien promulgó ese decreto, ni la Justicia que habita con los dioses subterráneos ha dictado tales leyes a los hombres; y no creí que tus órdenes humanas tuvieran tanta fuerza como para quebrantar las leyes no escritas e inmutables de los dioses. Leyes que no son de hoy ni de ayer, sino que viven eternamente y nadie sabe cuándo aparecieron. No iba yo a violarlas por miedo a la soberbia de un mortal". Creonte, herido en su orgullo de monarca y varón ("¡Mientras yo viva, ninguna mujer mandará sobre mí!"), ordena su condena a muerte. Ismene interviene suplicando compartir el castigo; pero Antígona la rechaza con desdén: "Tú elegiste la vida; yo, la muerte. La justicia no consiente que reclames lo que no te atreviste a defender".'
        },
        {
          titulo: 'La súplica de Hemón y la sentencia de la tumba de roca (Episodio III)',
          detalle: 'Se presenta el príncipe Hemón, hijo de Creonte y prometido nupcial de Antígona. Con inteligencia prudente, intenta persuadir a su padre de que la verdadera sabiduría del gobernante radica en escuchar el rumor del pueblo: toda la ciudad de Tebas compadece en voz baja a la muchacha considerándola digna de coronas de honor por evitar que su hermano sea devorado por las fieras. La discusión se enconada: Creonte lo tilda de esclavo servil de una mujer delincuente y Hemón le replica que una ciudad gobernada por la voluntad de un solo hombre deja de ser una patria para convertirse en un desierto tiránico. Ciego de ira, Creonte ordena traer a Antígona para degollarla en presencia de su novio; Hemón huye gritándole que jamás volverá a ver su rostro. Para evitar la mancha sagrada (miasma) de derramar directamente la sangre de una pariente, Creonte sustituye la lapidación por un castigo atroz: Antígona será conducida a una cueva de roca en el desierto y tapiada viva con provisiones mínimas para que agonice en la soledad.'
        },
        {
          titulo: 'La advertencia de Tiresias y el pánico del tirano (Episodio IV y V)',
          detalle: 'Antígona camina hacia su tumba pronunciando su desgarradora queja fúnebre ante el coro: marcha al tálamo de la muerte sin haber conocido bodas ni cantos de himeneo. Tras ser tapiada en la roca, hace su entrada el venerado adivino ciego Tiresias conducido de la mano por un niño. El vidente advierte con voz espantosa a Creonte que la cólera divina está suspendida sobre Tebas: las aves de presa se despedazan en el aire y vomitan la sangre podrida de Polinices sobre los altares; los dioses rechazan el humo de los sacrificios. Tiresias le conmina a enmendar el error de inmediato: "No te ensañes con un cadáver caído en el suelo; ¿qué gloria hay en rematar a un muerto?". En un primer momento, Creonte insulta al profeta acusándolo de lucro y falsedad; pero cuando Tiresias le profetiza que antes de que el sol se oculte pagará cadáver por cadáver entregando un hijo de sus propias entrañas en expiación, el pánico se apodera del soberano. Aterrado, Creonte consulta con humildad al Coro, revoca su sentencia y corre con sus siervos a quemar los restos de Polinices y abrir la tumba de roca para liberar a Antígona.'
        },
        {
          titulo: 'La hecatombe final y el dolor de Creonte (Éxodo)',
          detalle: 'Un mensajero llega al palacio para relatar el desenlace de la catástrofe ante la reina Eurídice: Creonte lavó piadosamente los restos mutilados de Polinices, oró y quemó lo que quedaba en una hoguera santa levantando un túmulo funerario. Luego marcharon apresuradamente hacia la bóveda de piedra; al retirar las rocas escucharon alaridos desgarradores dentro de la cueva. Al ingresar, descubrieron a Antígona ahorcada con el lazo de su velo de lino; a sus pies yacía Hemón abrazado a su cintura llorando la pérdida de su amada. Al ver entrar a su padre, Hemón lo miró con ojos salvajes escupiéndole el rostro, desenvainó su espada y lanzó una estocada contra el monarca; al fallar el golpe, el príncipe volvió la punta de la espada contra su propio pecho, se atravesó las costillas y, en su último aliento, enlazó el cuerpo moribundo de Antígona con sus brazos, tiñendo las mejillas pálidas de la joven con su sangre hirviente. Al escuchar el relato del mensajero, la reina Eurídice se retira en silencio mortal hacia el palacio; instantes después anuncian que se ha degollado ante el altar doméstico, maldiciendo en su agonía a Creonte como el asesino infame de sus dos hijos. Creonte ingresa cargando en brazos el cadáver de su hijo Hemón; al contemplar a su esposa muerta y sus dos vástagos inmolados, se desploma suplicando que alguien termine con su miserable vida, mientras el Coro de ancianos concluye con la máxima de la tragedia: "La prudencia es la base primera de la felicidad; jamás se debe ultrajar la ley de los dioses; las palabras soberbias de los hombres orgullosos se castigan con espantosos golpes, y solo en la vejez enseñan a tener cordura".'
        }
      ],
      personajes: [
        { nombre: 'Antígona', rol: 'Heroína de la piedad moral', descripcion: 'Hija de Edipo que personifica la firmeza heroica inquebrantable, anteponiendo el deber religioso del amor fraterno a las amenazas del poder tiránico.' },
        { nombre: 'Creonte', rol: 'Rey autócrata de Tebas', descripcion: 'Soberbio gobernante (hibris) obsesionado con la ley civil abstracta y la autoridad patriarcal, destruido por su ceguera moral.' },
        { nombre: 'Hemón', rol: 'Príncipe y prometido', descripcion: 'Hijo de Creonte que busca mediar con prudencia democrática, eligiendo el suicidio con su espada por amor a su prometida.' },
        { nombre: 'Ismene', rol: 'Hermana sumisa', descripcion: 'Joven prudente y obediente a las convenciones sociales, que teme a la autoridad de los varones y la fuerza del Estado.' },
        { nombre: 'Tiresias', rol: 'Vidente sagrado', descripcion: 'Portavoz ciego de la ley cósmica inmutable cuyos vaticinios despiertan el arrepentimiento tardío del autócrata.' }
      ],
      temasClave: [
        { titulo: 'El derecho natural contra el derecho positivo', explicacion: 'La contradicción entre las leyes humanas promulgadas por un Estado contingente (Creonte) y las leyes morales no escritas e inmutables de los dioses (Antígona).' },
        { titulo: 'La soledad de la conciencia heroica', explicacion: 'El aislamiento de quien asume la justicia en contra del consenso temeroso de la colectividad social.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Tragedia cumbre de Sófocles y del teatro griego clásico. Escenifica el desafío de Antígona contra el decreto del rey Creonte que prohibía dar sepultura a su hermano Polinices, culminando en el encarcelamiento en la roca, el ahorcamiento de la heroína y la muerte de Hemón y Eurídice que devasta moralmente al tirano.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Dramático — Tragedia clásica' },
        { clave: 'Autor', valor: 'Sófocles (Colono, Atenas)' },
        { clave: 'Año de representación', valor: '441 a. C. en las fiestas Dionisíacas' },
        { clave: 'Ciclo mitológico', valor: 'Ciclo Tebano (continuación de Edipo Rey y Los siete contra Tebas)' },
        { clave: 'Conflicto filosófico', valor: 'Ágrafos nómos (ley no escrita divina) vs. Nómos póleos (decreto civil del Estado)' }
      ],
      elementosClave: [
        { titulo: 'La frase capital de Antígona', contenido: '"No nací para compartir el odio, sino para compartir el amor", proclama de la fraternidad universal sobre las disputas políticas.' },
        { titulo: 'La muerte en la cueva', contenido: 'Se ahorca con su propio velo de lino; no muere de hambre pasiva, elige su propio destino ante el encierro forzado.' },
        { titulo: 'El destino de Creonte', contenido: 'No muere físicamente: es condenado a vivir destruido contemplando los cadáveres de su hijo y esposa por su soberbia.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué Creonte prohíbe terminantemente enterrar a Polinices pero rinde honores a Eteocles?',
          respuesta: 'Porque consideraba a Eteocles el patriota defensor de Tebas y a Polinices un traidor sedicioso que condujo a un ejército extranjero (los argivos) a saquear e incendiar su propia tierra natal.'
        },
        {
          pregunta: '¿Cómo muere Hemón en la cueva?',
          respuesta: 'Al fallar la estocada contra su padre Creonte, vuelve la espada contra su propio cuerpo, se atraviesa el pecho y muere abrazando el cadáver ahorcado de Antígona.'
        }
      ]
    }
  },
  {
    id: 'ficciones',
    titulo: 'Ficciones',
    autor: 'Jorge Luis Borges',
    año: '1944',
    pais: 'Argentina',
    genero: 'Narrativo',
    especie: 'Libro de cuentos metaficcionales / fantásticos',
    corriente: 'Vanguardismo / Literatura Fantástica y Metaficción',
    temaPrincipal: 'El universo como laberinto infinito, el infinito temporal y espacial, los espejos que duplican la irrealidad, el libro infinito y los límites de la memoria y la identidad humana.',
    portadaGradiente: 'linear-gradient(145deg, #09090b 0%, #1e1b4b 50%, #312e81 100%)',
    categoria: 'Literatura Hispanoamericana',
    resumenDetallado: {
      sinopsis: 'Publicado en Buenos Aires en 1944, Ficciones reúne dos colecciones magistrales: El jardín de senderos que se bifurcan (1941) y Artificios (1944). Borges subvierte las convenciones de la narrativa decimonónica convirtiendo la filosofía, la teología, la metafísica y la bibliografía en materias del arte fantástico y policial. A través de relatos antológicos como "El jardín de senderos que se bifurcan" (el laberinto temporal infinito), "Las ruinas circulares" (el soñador que descubre ser soñado por otro), "Funes el memorioso" (el agobio de una memoria monstruosamente fotográfica), "La biblioteca de Babel" (el cosmos como archivo infinito de galerías hexagonales) y "El Sur" (la tensión entre la civilización urbana y el coraje criollo en el filo de un duelo a cuchillo), Borges revolucionó la prosa en lengua española con una concisión deslumbrante, erudición lúdica y precisión conceptual matemática.',
      contextoHistorico: 'Editado por Sur en 1944. Consagró a Jorge Luis Borges en el panorama literario internacional como el arquitecto supremo de la literatura conceptual, influyendo decisivamente en el pensamiento posmoderno, la teoría literaria y la informática.',
      analisisTrama: [
        {
          titulo: 'Estructura bipartita: "El jardín de senderos que se bifurcan" y "Artificios"',
          detalle: 'El libro se compone de dos secciones orgánicas:\n1) El jardín de senderos que se bifurcan (ocho cuentos publicados originalmente en 1941: Tlön, Uqbar, Orbis Tertius; El acercamiento a Almotásim; Pierre Menard, autor del Quijote; Las ruinas circulares; La lotería en Babilonia; Examen de la obra de Herbert Quain; La biblioteca de Babel; y El jardín de senderos que se bifurcan).\n2) Artificios (nueve cuentos agregados en 1944: Prólogo; Funes el memorioso; La forma de la espada; Tema del traidor y del héroe; La muerte y la brújula; El milagro secreto; Tres versiones de Judas; El fin; La secta del Fénix; y El Sur).'
        },
        {
          titulo: '"El jardín de senderos que se bifurcan": El laberinto del tiempo infinito',
          detalle: 'Ambientado durante la Primera Guerra Mundial. El narrador, el doctor Yu Tsun, un antiguo catedrático de inglés en Tsingtao que trabaja como espía para el Imperio Alemán en Inglaterra, es perseguido a muerte por el implacable capitán irlandés Richard Madden. Sabiendo que será capturado en breve y necesitando comunicar a Berlín el nombre secreto de la ciudad donde los aliados tienen su parque de artillería en el río Ancre, busca en la guía de teléfonos a la única persona cuyo apellido coincida con el nombre de la ciudad: el ilustre sinólogo Stephen Albert. Yu Tsun viaja en tren hasta la solitaria casa campestre de Albert. Para su asombro, el sinólogo lo recibe hospitalariamente creyéndolo un admirador de su ilustre antepasado Ts\'ui Pên, quien en el pasado se recluyó durante trece años para cumplir dos fines: escribir una novela monumental y construir un laberinto inabarcable. Albert revela el enigma que nadie había descifrado: la novela y el laberinto eran el mismo objeto. En las novelas ordinarias, ante diversas opciones el autor elige una y descarta las otras; en el libro infinito de Ts\'ui Pên, el autor opta simultáneamente por todas: se abren infinitos tiempos paralelos que divergen, convergen y se bifurcan sin cesar (en un tiempo somos amigos, en otro enemigos, en otro desconocidos). En ese momento supremo, Yu Tsun divisa al capitán Madden acercándose por el sendero; sabiendo que su fin ha llegado, pide perdón a Albert, saca su revólver y le dispara un tiro en la espalda matándolo al instante. Yu Tsun es detenido y condenado a la horca, pero consumó su misión con éxito macabro: los periódicos de Londres publicaron la noticia del asesinato de Stephen Albert por un forastero, permitiendo al estado mayor alemán en Berlín bombardear la ciudad francesa de Albert.'
        },
        {
          titulo: '"Las ruinas circulares": El demiurgo soñado',
          detalle: 'Un hombre taciturno llega en una canoa de bambú a las ruinas calcinadas de un templo circular consagrado a los dioses del fuego. Su propósito supremo no es imposible, aunque sí sobrehumano: quiere soñar a un hombre con minuciosa integridad anatómica y espiritual para imponerlo en la realidad física exterior. Tras meses de concentración mental en sus noches de sueño, sueña primero un corazón que late, luego las vísceras, el esqueleto, los cabellos y finalmente un mancebo dormido. El joven es incapaz de despertar; el soñador suplica ayuda ante la estatua del dios del fuego, quien se le aparece y le da vida al muchacho con una condición: el hijo vivirá en el mundo terrenal y todos lo creerán humano, excepto el Fuego, que respetará su cuerpo irreal. El padre educa a su creación y lo envía río abajo a otro santuario. Años después, unos remeros le informan de un hombre mágico que camina sobre las llamas sin quemarse; el soñador teme que su hijo descubra su condición de mero simulacro espectral. Poco después, un incendio forestal colosal cerca las ruinas del templo; el anciano mago decide no huir y camina serenamente hacia las llamaradas esperando la muerte. Para su asombro, el fuego no muerde sus carnes, sino que lo acaricia e ilumina sin calor: comprende en ese instante de iluminación cósmica, con alivio, con humillación y con terror, que él también era una mera ilusión soñada por otro.'
        },
        {
          titulo: '"Funes el memorioso": La tragedia de la percepción total',
          detalle: 'Borges rememora sus visitas al pueblo uruguayo de Fray Bentos en 1884, donde conoció al joven gaucho Ireneo Funes. Tras sufrir una caída de un caballo redomón que lo dejó tullido, Funes adquiere una facultad monstruosa e implacable: una memoria absoluta y fotográfica. Funes no solo recuerda cada línea de cada libro que ha leído, sino cada hoja de cada árbol de cada monte que vio una tarde, y cada una de las formas de las nubes del sur en el amanecer del 30 de abril de 1882, comparándolas en su memoria con los granos de espuma de un remo alzado en el río Negro. Funes inventa un sistema numérico propio donde cada cifra tiene un nombre arbitrario (Máximo Pérez, el ferrocarril, el azufre), pero no comprende el principio decimal. Borges reflexiona con lucidez filosófica sobre la incapacidad metafísica de Funes: su mente es un vaciadero de detalles sensoriales infinitos, pero es incapaz de pensar verdaderamente, porque pensar consiste precisamente en olvidar diferencias, abstraer y generalizar ("Sospecho, sin embargo, que no era muy capaz de pensar. Pensar es olvidar diferencias, es generalizar, abstraer. En el abarrotado mundo de Funes no había sino detalles, casi inmediatos"). Funes muere a los veintiún años víctima de una congestión pulmonar, aplastado por el peso intolerable de sus recuerdos.'
        },
        {
          titulo: '"La biblioteca de Babel": El cosmos como arquitectura infinita',
          detalle: 'El narrador, un anciano bibliotecario a punto de morir, describe el universo concebido como una vasta biblioteca compuesta por un número indefinido, y tal vez infinito, de galerías hexagonales idénticas comunicadas por pozos de ventilación centrales rodeados de barandas bajas. Cada hexágono tiene cuatro paredes con anaqueles de libros, un zaguán, un espejo y una letrina. Cada libro consta rigurosamente de 410 páginas; cada página de 40 renglones; cada renglón de unas 80 letras de color negro. Los libros utilizan únicamente 25 caracteres ortográficos (las 22 letras del alfabeto, el punto, la coma y el espacio). Como la combinación de estos caracteres es exhaustiva, la Biblioteca contiene todos los libros concebibles en todas las lenguas posibles: desde la historia minuciosa del porvenir, las profecías del destino humano y los catálogos fieles, hasta millones de volúmenes colmados de renglones absurdos e incoherentes. Durante generaciones, los hombres han recorrido los hexágonos en peregrinaciones desesperadas buscando el libro que contenga la justificación de su existencia ("Las Vindicaciones") o al bibliotecario mítico que haya leído el "Libro Total" y sea como un dios, cayendo en el suicidio, el fanatismo destructor y la locura. El narrador concluye postulando una solución matemática elegante: la Biblioteca es ilimitada y periódica; si un viajero eterno la cruzara en cualquier dirección comprobaría que los mismos volúmenes se repiten en el mismo desorden, demostrando que el desorden aparente del universo es en realidad un Orden secreto y perfecto.'
        },
        {
          titulo: '"El Sur": El doble destino y la muerte heroica de Juan Dahlmann',
          detalle: 'Considerado por el propio Borges como su mejor cuento. Narra la historia de Juan Dahlmann, secretario de una biblioteca municipal en Buenos Aires que atesora con orgullo dos linajes contrapuestos: su abuelo paterno, el pastor evangélico Johannes Dahlmann (civilizado y europeo), y su abuelo materno, Francisco Flores, soldado de frontera muerto por los indios en la pampa (bárbaro y criollo). En febrero de 1939, Dahlmann adquiere un ejemplar descabalado de Las mil y una noches de Weil; al subir apurado la escalera de su casa, la arista de un batiente recién pintado le roza la frente abriéndole una herida. En los días siguientes sufre fiebres altísimas y pesadillas atroces; es trasladado a un sanatorio donde los cirujanos le clavan una aguja en la cabeza en una dolorosa desinfección por septicemia. Al recibir el alta, aborda un tren hacia el Sur para convalecer en su estancia heredada en la pampa. El viaje en tren se transforma en un tránsito misterioso hacia el pasado rural arcaico. El tren se detiene en una estación desierta antes de su destino; Dahlmann entra a un almacén de campo rústico a comer donde unos parroquianos ebrios juegan a los naipes. Un compadrito le arroja bolitas de miga de pan al rostro para provocarlo; el patrón del almacén interviene llamándolo por su apellido ("Señor Dahlmann, no les haga caso a esos mozos, que están achispados"), forzando a Dahlmann a defender su honor. El compadrito saca una daga larga; en ese instante, desde un rincón oscuro, un viejo gaucho extático (símbolo eterno de la pampa) le arroja a los pies una daga desnuda. Dahlmann, que jamás ha empuñado un arma blanca en su vida, recoge el cuchillo comprendiendo que ese combate desigual sellará su muerte en el polvo, pero que es la muerte romántica y heroica que hubiera elegido cuando agonizaba en la camilla del hospital: "Sintió, al atravesar el umbral, que morir en una pelea a cuchillo, a cielo abierto y acometiendo, hubiera sido una liberación para él, una felicidad y una fiesta, en la primera noche del sanatorio, cuando le clavaron la aguja... Sintió que si él, entonces, hubiera podido elegir o soñar su muerte, esta es la muerte que hubiera elegido o soñado". Empuña con firmeza el acero y sale al llano a morir.'
        }
      ],
      personajes: [
        { nombre: 'El Narrador borgeano', rol: 'Escritor y erudito lúdico', descripcion: 'Voz reflexiva que combina la precisión enciclopédica, la ironía filosófica y el desconcierto ante los enigmas del infinito.' },
        { nombre: 'Yu Tsun', rol: 'Espía y homicida intelectual', descripcion: 'Catedrático chino que ejecuta un asesinato matemático para cumplir su deber de espía alemán en Inglaterra.' },
        { nombre: 'Stephen Albert', rol: 'Sinólogo descifrador', descripcion: 'Sabio que devela el enigma del laberinto temporal de Ts\'ui Pên antes de ser asesinado por su huésped.' },
        { nombre: 'Ireneo Funes', rol: 'Gaucho de la memoria absoluta', descripcion: 'Joven postrado por una caída de caballo condenado a la tortura de recordar cada detalle sensorial del cosmos sin poder pensar.' },
        { nombre: 'Juan Dahlmann', rol: 'Bibliotecario del destino pampeano', descripcion: 'Intelectual urbano desgarrado entre la civilización del sanatorio y la llamada heroica de la sangre criolla en el duelo a cuchillo.' }
      ],
      temasClave: [
        { titulo: 'El universo como laberinto de bifurcaciones temporales', explicacion: 'El tiempo no es una línea recta uniforme; es una red infinita de tiempos divergentes y paralelos donde todas las posibilidades coexisten.' },
        { titulo: 'La metaficción y la realidad como sueño ajeno', explicacion: 'La literatura no es una copia pasiva de la realidad externa; la propia realidad terrenal es una invención textual o un sueño dentro de otro sueño.' }
      ]
    },
    apunteRepaso: {
      sintesisExpress: 'Cúspide de la literatura fantástica y metaficcional universal. Colección de relatos de Jorge Luis Borges articulada en dos secciones ("El jardín de senderos que se bifurcan" y "Artificios") que exploran el infinito, los laberintos temporales, la memoria fotográfica absoluta y el duelo criollo pampeano.',
      datosFundamentales: [
        { clave: 'Género y especie', valor: 'Narrativo — Libro de cuentos fantásticos / metaficcionales' },
        { clave: 'Autor', valor: 'Jorge Francisco Isidoro Luis Borges Acevedo (Buenos Aires)' },
        { clave: 'Año de publicación', valor: '1944 (Editorial Sur, Buenos Aires)' },
        { clave: 'Composición', valor: 'Dos secciones: 1) El jardín de senderos que se bifurcan (1941), 2) Artificios (1944)' },
        { clave: 'Cuento predilecto del autor', valor: '"El Sur" (fusión de autobiografía de su accidente y el mito gaucho)' }
      ],
      elementosClave: [
        { titulo: 'El laberinto de Ts\'ui Pên', contenido: 'Un libro donde todas las posibilidades ocurren simultáneamente: metáfora pionera de la física cuántica de universos paralelos y del hipertexto informático.' },
        { titulo: 'La imposibilidad del pensamiento en Funes', contenido: 'Pensar requiere olvidar diferencias y abstraer; al recordarlo todo con precisión sensorial idéntica, Funes vive sepultado en detalles sin poder sintetizar.' },
        { titulo: 'La ambigüedad del final de "El Sur"', contenido: 'Estructura dual: el duelo en la pampa puede leerse como un hecho real o como el delirio alucinatorio de Dahlmann mientras muere anestesiado en el sanatorio.' }
      ],
      preguntasFrecuentes: [
        {
          pregunta: '¿Por qué el espía Yu Tsun asesina a Stephen Albert en "El jardín de senderos que se bifurcan"?',
          respuesta: 'No tenía nada en contra de él: lo mató para que su nombre figurara en los periódicos de Londres, comunicando telegráficamente a los mandos alemanes que la ciudad a bombardear en Francia era Albert.'
        },
        {
          pregunta: '¿Qué revelación metafísica descubre el mago al final de "Las ruinas circulares"?',
          respuesta: 'Al ver que las llamas de un incendio colosal no queman su carne ni le causan dolor, comprende con terror y alivio que él tampoco era un hombre real, sino la ilusión soñada por otro mago.'
        }
      ]
    }
  }
];

export const LITERATURA_CATEGORIAS = [
  'Todas',
  'Literatura Peruana',
  'Literatura Hispanoamericana',
  'Literatura Universal'
];
