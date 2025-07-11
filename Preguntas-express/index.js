// Archivo: server.js (Servidor con Node.js y Socket.io)
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// Preguntas aleatorias (puedes reemplazarlas por una API o base de datos real)
const preguntas = [
  {
    pregunta: "¿Quién escribió 1984?",
    opciones: ["George Orwell", "Borges", "Lope de Vega"],
    respuesta: "George Orwell"
  },
  {
    pregunta: "¿En qué año ocurrió el descubrimiento de América?",
    opciones: ["1502", "1492", "1482"],
    respuesta: "1492"
  },
  {
    pregunta: "¿Cuál es la capital de España?",
    opciones: ["Ottawa", "Madrid", "Bogotá"],
    respuesta: "Madrid"
  },
  {
    pregunta: "¿Cuál es la capital de Australia?",
    opciones: ["Canberra", "Berlín", "Bogotá"],
    respuesta: "Canberra"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo He?",
    opciones: ["Plomo", "Helio", "Cobre"],
    respuesta: "Helio"
  },
  {
    pregunta: "¿Qué país ganó el mundial de fútbol en 1998?",
    opciones: ["Italia", "Brasil", "Argentina"],
    respuesta: "Francia"
  },
  {
    pregunta: "¿Quién escribió La Divina Comedia?",
    opciones: ["Lope de Vega", "Pablo Neruda", "Borges"],
    respuesta: "Dante"
  },
  {
    pregunta: "¿Cuál es la capital de Japón?",
    opciones: ["Madrid", "Tokio", "Lima"],
    respuesta: "Tokio"
  },
  {
    pregunta: "¿Qué país ganó el mundial de fútbol en 1998?",
    opciones: ["Alemania", "Francia", "Argentina"],
    respuesta: "Francia"
  },
  {
    pregunta: "¿Qué país ganó el mundial de fútbol en 2018?",
    opciones: ["Italia", "Brasil", "Francia"],
    respuesta: "Francia"
  },
  {
    pregunta: "¿Quién escribió La Divina Comedia?",
    opciones: ["Borges", "Dante", "Lope de Vega"],
    respuesta: "Dante"
  },
  {
    pregunta: "¿Qué país ganó el mundial de fútbol en 2010?",
    opciones: ["Argentina", "Italia", "España"],
    respuesta: "España"
  },
  {
    pregunta: "¿Qué país ganó el mundial de fútbol en 1994?",
    opciones: ["Alemania", "Brasil", "Argentina"],
    respuesta: "Brasil"
  },
  {
    pregunta: "¿Cuál es la capital de Rusia?",
    opciones: ["Moscú", "París", "Brasilia"],
    respuesta: "Moscú"
  },
  {
    pregunta: "¿Quién escribió Crimen y castigo?",
    opciones: ["Dostoyevski", "Pablo Neruda", "Borges"],
    respuesta: "Dostoyevski"
  },
  {
    pregunta: "¿En qué año ocurrió el descubrimiento de América?",
    opciones: ["1482", "1502", "1492"],
    respuesta: "1492"
  },
  {
    pregunta: "¿Qué país ganó el mundial de fútbol en 2006?",
    opciones: ["Italia", "Italia", "Brasil"],
    respuesta: "Italia"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo O?",
    opciones: ["Oro", "Mercurio", "Cobre"],
    respuesta: "Oxígeno"
  },
  {
    pregunta: "¿En qué año ocurrió la revolución francesa?",
    opciones: ["1779", "1799", "1789"],
    respuesta: "1789"
  },
  {
    pregunta: "¿Cuál es la capital de Italia?",
    opciones: ["Moscú", "Bogotá", "Ciudad de México"],
    respuesta: "Roma"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo H?",
    opciones: ["Cobre", "Plomo", "Hidrógeno"],
    respuesta: "Hidrógeno"
  },
  {
    pregunta: "¿Quién escribió Romeo y Julieta?",
    opciones: ["Lope de Vega", "Borges", "Shakespeare"],
    respuesta: "Shakespeare"
  },
  {
    pregunta: "¿Cuál es la capital de Italia?",
    opciones: ["Canberra", "Roma", "Bogotá"],
    respuesta: "Roma"
  },
  {
    pregunta: "¿En qué año ocurrió la revolución francesa?",
    opciones: ["1799", "1789", "1779"],
    respuesta: "1789"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo Au?",
    opciones: ["Oro", "Oro", "Mercurio"],
    respuesta: "Oro"
  },
  {
    pregunta: "¿Quién escribió Don Quijote?",
    opciones: ["Borges", "Lope de Vega", "Pablo Neruda"],
    respuesta: "Cervantes"
  },
  {
    pregunta: "¿Cuál es la capital de Alemania?",
    opciones: ["Ottawa", "Berlín", "París"],
    respuesta: "Berlín"
  },
  {
    pregunta: "¿Quién escribió Crimen y castigo?",
    opciones: ["Borges", "Pablo Neruda", "Dostoyevski"],
    respuesta: "Dostoyevski"
  },
  {
    pregunta: "¿En qué año ocurrió la caída del muro de Berlín?",
    opciones: ["1979", "1999", "1989"],
    respuesta: "1989"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo He?",
    opciones: ["Cobre", "Helio", "Mercurio"],
    respuesta: "Helio"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo C?",
    opciones: ["Plomo", "Oro", "Mercurio"],
    respuesta: "Carbono"
  },
  {
    pregunta: "¿Cuál es la capital de Australia?",
    opciones: ["Ottawa", "Lima", "Canberra"],
    respuesta: "Canberra"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo Au?",
    opciones: ["Plomo", "Cobre", "Oro"],
    respuesta: "Oro"
  },
  {
    pregunta: "¿Cuál es la capital de Francia?",
    opciones: ["París", "Brasilia", "París"],
    respuesta: "París"
  },
  {
    pregunta: "¿Quién escribió La Divina Comedia?",
    opciones: ["Lope de Vega", "Pablo Neruda", "Dante"],
    respuesta: "Dante"
  },
  {
    pregunta: "¿En qué año ocurrió la revolución francesa?",
    opciones: ["1779", "1799", "1789"],
    respuesta: "1789"
  },
  {
    pregunta: "¿Qué país ganó el mundial de fútbol en 2010?",
    opciones: ["Argentina", "España", "Brasil"],
    respuesta: "España"
  },
  {
    pregunta: "¿Quién escribió Crimen y castigo?",
    opciones: ["Borges", "Lope de Vega", "Dostoyevski"],
    respuesta: "Dostoyevski"
  },
  {
    pregunta: "¿En qué año ocurrió la caída del muro de Berlín?",
    opciones: ["1999", "1979", "1989"],
    respuesta: "1989"
  },
  {
    pregunta: "¿En qué año ocurrió la llegada del hombre a la Luna?",
    opciones: ["1979", "1969", "1959"],
    respuesta: "1969"
  },
  {
    pregunta: "¿Cuál es la capital de Canadá?",
    opciones: ["Toronto", "Ottawa", "Vancouver"],
    respuesta: "Ottawa"
  },
  {
    pregunta: "¿Qué órgano del cuerpo humano bombea sangre?",
    opciones: ["Hígado", "Corazón", "Riñón"],
    respuesta: "Corazón"
  },
  {
    pregunta: "¿Quién pintó la Mona Lisa?",
    opciones: ["Miguel Ángel", "Picasso", "Leonardo da Vinci"],
    respuesta: "Leonardo da Vinci"
  },
  {
    pregunta: "¿Cuál es el planeta más grande del sistema solar?",
    opciones: ["Saturno", "Júpiter", "Marte"],
    respuesta: "Júpiter"
  },
  {
    pregunta: "¿Qué instrumento tiene teclas blancas y negras?",
    opciones: ["Violín", "Piano", "Flauta"],
    respuesta: "Piano"
  },
  {
    pregunta: "¿En qué continente se encuentra Egipto?",
    opciones: ["Asia", "África", "Europa"],
    respuesta: "África"
  },
  {
    pregunta: "¿Cuántos días tiene un año bisiesto?",
    opciones: ["364", "365", "366"],
    respuesta: "366"
  },
  {
    pregunta: "¿Qué gas respiran los seres humanos?",
    opciones: ["Dióxido de carbono", "Oxígeno", "Hidrógeno"],
    respuesta: "Oxígeno"
  },
  {
    pregunta: "¿Quién escribió 'Cien años de soledad'?",
    opciones: ["Mario Vargas Llosa", "Gabriel García Márquez",             "Isabel Allende"],
    respuesta: "Gabriel García Márquez"
  },
  {
    pregunta: "¿Qué país tiene forma de bota?",
    opciones: ["Italia", "España", "Chile"],
    respuesta: "Italia"
  },
  {
    pregunta: "¿Qué animal es conocido como el 'rey de la selva'?",
    opciones: ["Tigre", "León", "Elefante"],
    respuesta: "León"
  },
  {
    pregunta: "¿Cuál es el océano más grande del mundo?",
    opciones: ["Atlántico", "Índico", "Pacífico"],
    respuesta: "Pacífico"
  },
  {
    pregunta: "¿Qué colores tiene la bandera de Francia?",
    opciones: ["Rojo, blanco y verde", "Azul, blanco y rojo", "Amarillo, azul y blanco"],
    respuesta: "Azul, blanco y rojo"
  },
  {
    pregunta: "¿En qué país nació el tango?",
    opciones: ["México", "España", "Argentina"],
    respuesta: "Argentina"
  },
  {
    pregunta: "¿Qué lengua se habla en Brasil?",
    opciones: ["Portugués", "Español", "Francés"],
    respuesta: "Portugués"
  },
  {
    pregunta: "¿Qué planeta es conocido como el planeta rojo?",
    opciones: ["Júpiter", "Venus", "Marte"],
    respuesta: "Marte"
  },
  {
    pregunta: "¿Quién descubrió América?",
    opciones: ["Cristóbal Colón", "Américo Vespucio", "Magallanes"],
    respuesta: "Cristóbal Colón"
  },
  {
    pregunta: "¿Qué número es el doble de 12?",
    opciones: ["24", "22", "20"],
    respuesta: "24"
  },
  {
    pregunta: "¿Cuál es el río más largo del mundo?",
    opciones: ["Amazonas", "Nilo", "Yangtsé"],
    respuesta: "Nilo"
  },
  {
    pregunta: "¿Cuántos planetas hay en el sistema solar?",
    opciones: ["9", "7", "8"],
    respuesta: "8"
  }
];


let jugadores = {};
let jugadoresActivos = [];
let ronda = 0;
let preguntaActual = null;

function obtenerPreguntaAleatoria() {
  let usada;
  do {
    usada = preguntas[Math.floor(Math.random() * preguntas.length)];
  } while (preguntaActual && usada.pregunta === preguntaActual.pregunta);
  preguntaActual = usada;
  return usada;
}

function iniciarRonda() {
  if (jugadoresActivos.length <= 1) {
    if (jugadoresActivos.length === 1) {
      io.emit("ganador", jugadoresActivos[0]);
    } else {
      io.emit("sin_jugadores", true);
    }
    jugadores = {};
    jugadoresActivos = [];
    ronda = 0;
    return;
  }

  const pregunta = obtenerPreguntaAleatoria();
  ronda++;
  io.emit("nueva_pregunta", { pregunta, ronda });

  const respondieron = new Set();
  const correctos = [];

  io.once("respuestas", (data) => {
    data.forEach(({ nick, respuesta }) => {
      if (!respondieron.has(nick) && jugadores[nick]) {
        respondieron.add(nick);
        if (respuesta === pregunta.respuesta) {
          correctos.push(nick);
        }
      }
    });

    jugadoresActivos = jugadoresActivos.filter((nick) => correctos.includes(nick));
    iniciarRonda();
  });

  setTimeout(() => {
    io.emit("tiempo_terminado");
    io.emit("verificar_respuestas");
  }, 10000);
}

io.on("connection", (socket) => {
  socket.on("nuevo_jugador", (nick) => {
    jugadores[nick] = socket.id;
    jugadoresActivos.push(nick);
    io.emit("jugadores_actualizados", jugadoresActivos);
  });

  socket.on("iniciar_juego", () => {
    if (jugadoresActivos.length > 1) {
      iniciarRonda();
    }
  });

  socket.on("enviar_respuestas", (data) => {
    io.emit("respuestas", data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
