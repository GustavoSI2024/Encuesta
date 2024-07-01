const {rest} = require('./conexion.js');
const {createTicket} = require('./deskApi/zohoDesk.js');

let cliente;
const welcome = ['hola','Hola', 'buenas tardes', 'buenos dias', 'buenas noches', 'ola', 'buenas', 'me podrian apoyar'];
const godBye = ['adios', 'hasta luego', 'gracias', 'gracias por todo', 'bye', 'buena tarde', 'gracias que tenga buena tarde'];
const Cotizacion = [
  "puede darme una cotización para un automóvil",
  "quiero un seguro de auto",
  "cotizar auto",
  "cotizar mi auto",
  "seguro de auto",
  "seguros de auto",
  "auto seguro",
  "necesito un seguro de auto",
  "necesito seguro de auto",
  "necesito un seguro de automovil",
  "necesito seguro de automovil",
  "quiero cotizar un auto",
  "quiero cotizar un automovil",
  "como puedo cotizar mi auto",
  "quiero proteger mi auto",
  "proteger mi auto",
  "necesito cotizar mi auto",
  "quiero proteger mi auto",
  "proteger mi auto"

];
const USER = {};
const USER_COMEN = {};
const INIT = [];

const clearData = async() =>{
  setInterval(async () => {
    await deleteUsers()
    console.log('se ejecuto interval');
    //fecha = await  fechaActual();
  }, 24 * 60 * 60 * 1000);

}

  const deleteUsers = async () => {
    await INIT.forEach(item => {delete USER[item]})
    console.log('Se eliminaron datos correctamente')
  }


  const fechaActual = () => {
    let fecha = new Date();
    let año = fecha.getFullYear();
    let mes = (fecha.getMonth()+1).toString().padStart(2,'0');
    let dia = fecha.getDate().toString().padStart(2,'0');
    return `${año}-${mes}-${dia}`
  }
  
  //CONSULTA DATOS DEL CLIENTE
  const Consulta = async (NUMERO) => {
    try {
        let response = await rest.executeQuery("select * from REGISTROS_CLIENTES where NUMERO = @NUMERO",
        [
         {
            name: "NUMERO",
            type: "nvarchar",
            value: NUMERO,
         }
        ])
        console.log(response.data)
        if(response.data[0][0]) return response.data[0][0];
    } catch (error) {
        throw error;
    }
  }
  

//GUARDAR DATOS EN LA BASE DE DATOS
const guardarDatos = async (NUMERO_TELEFONO,OPCION,NUMERO_TICKET,COMENTARIO,ID_TICKET_ZOHODESK) => {
    let FECHA = await fechaActual();
    try {
        let response = await rest.executeQuery("insert into Comentarios (NUMERO_TELEFONO,OPCION,NUMERO_TICKET,FECHA,COMENTARIO,ID_TICKET_ZOHODESK) values (@NUMERO_TELEFONO,@OPCION,@NUMERO_TICKET,@FECHA,@COMENTARIO,@ID_TICKET_ZOHODESK)",
        [
         {
            name: "NUMERO_TELEFONO",
            type: "nvarchar",
            value: NUMERO_TELEFONO,
         },
         {
            name: "OPCION",
            type: "nvarchar",
            value: OPCION,
         },
         {
            name: "NUMERO_TICKET",
            type: "nvarchar",
            value: NUMERO_TICKET,
         },
         {
            name: "FECHA",
            type: "date",
            value: FECHA,
         },
         {
            name: "COMENTARIO",
            type: "nvarchar",
            value: COMENTARIO,
         },
         {
          name: "ID_TICKET_ZOHODESK",
          type: "nvarchar",
          value: ID_TICKET_ZOHODESK,
       }
        ])
        console.log(response.data)
        console.log('DATOS GUARDADOS EN LA BASE DE DATOS')
    } catch (error) {
        console.log('ERROR AL GUARDAR EN LA BASE DE DATOS')
    }
}


//VALIDA COMENTARIO VALIDO
const capturarMensaje = async (respuesta) => {
    if(respuesta.body.length >= 20) {
        await cliente.sendText(respuesta.from, 'Gracias por tus comentarios.');
        USER[Number(id.replace('@u.us', '').substring(3,13))].mensaje = respuesta.body;
        return true;
    }
    await cliente.sendText(respuesta.from, 'Por favor introduce un comentario valido, solo se aceptan letras');
    return false;

};

//INICIALIZACION DE OBJETO
const inicializacion = (id,op,opCf) => {
    USER[id] = {
        capturar: true,
        numero: id.replace('@u.us', '').substring(3,13),
        mensaje: '',
        comentario: false,
        opcion: op,
        data: null,
        comen: true,
        cf: opCf,
        data: null,
        fecha: fechaActual(),
        desk: null
    };
    console.log('se inicializo con el numero', id, "fecha", USER[id].fecha)
}



//FUNCION PRINCIPAL
const start = async (client) => {
  cliente = client;
  client.onMessage(async (message) => {
      console.log(message.body);

      if (USER[message.from] && USER[message.from].comentario && USER[message.from].mensaje && (message.body === '1' || message.body === '2' || message.body === '3')) {
          client.sendText(message.from, 'Tu respuesta ya fue almacenada previamente.');
          return;
      }
      try {
        if(USER[message.from].comen && !message.isGroupMsg && !USER[message.from].comentario) {
          USER[message.from].mensaje = message.body;
          if(USER[message.from].mensaje.length >= 20) {
              try {
                  if(USER[message.from].opcion === '2' || USER[message.from].opcion === '3'){
                      USER[message.from].data = await Consulta(USER[message.from].numero);
                      if(USER[message.from] && USER[message.from].data && USER[message.from].data.NUMERO_TICKET){
                        USER[message.from].data = await createTicket(USER[message.from].opcion, USER[message.from].mensaje,USER[message.from].opCf, USER[message.from].numero,USER[message.from].data.NUMERO_TICKET);
                        await guardarDatos(USER[message.from].numero, USER[message.from].opcion, USER[message.from].data.ticketNumber, USER[message.from].mensaje,USER[message.from].data.id);
                      }else{
                        //REGISTRO DE OTRA BASE SE MARCA COMO 0000000
                        await guardarDatos(USER[message.from].numero, USER[message.from].opcion, '000000', USER[message.from].mensaje,'000000000000000000');
                      }
                  }else{
                    if(USER[message.from] && USER[message.from].data && USER[message.from].data.NUMERO_TICKET) await guardarDatos(USER[message.from].numero, USER[message.from].opcion, '111111', USER[message.from].mensaje,'111111111111111111');//OPCION 1 DE LA BASE ACTUAL =111111111
                    //OPCION 1 DE OTRA BASE = 1111/000
                    else  await guardarDatos(USER[message.from].numero, USER[message.from].opcion, '111111', USER[message.from].mensaje,'000000000000000000');
                  }
                  await client.sendText(message.from, 'Gracias por tus comentarios.');
                  USER[message.from].comentario = true;
                  INIT.push(message.from);
              } catch (error) {
                  await client.sendText(message.from, 'Lo siento, estoy teniendo problemas para guardar tu respuesta, intenta más tarde...');
                  console.log(error)
              }
          } else {
              await client.sendText(message.from, 'Por favor introduce un comentario válido con al menos 20 caracteres.');
          }
      }
      } catch (error) {
        
      }
      

      if (message.body === '1' && !message.isGroupMsg) {
          await client.sendReactions(message.id, '❤️');
          await client.sendText(message.from, `Gracias por tu respuesta eligiste ${message.body}`);
          await client.sendText(message.from, 'Nos complace saber que has tenido una experiencia satisfactoria con nosotros, valoramos tu opinión, te invitamos a compartir tus comentarios para seguir mejorando nuestro servicio. *Mínimo 20 caracteres*');
          inicializacion(message.from, '1','Bueno');
          //comentarios.push(message.from);
      } else if (message.body === '2' && !message.isGroupMsg) {
          await client.sendReactions(message.id, '👍');
          await client.sendText(message.from, `Gracias por tu respuesta eligiste ${message.body}`);
          await client.sendText(message.from, 'Agradecemos sinceramente tu respuesta, queremos mejorar continuamente, te invitamos a que compartas tus observaciones para que podamos aprender de ellas y brindarte la mejor experiencia posible en el futuro, *Mínimo 20 caracteres*');
          inicializacion(message.from, '2','Aceptable');
          //comentarios.push(message.from);
      } else if (message.body === '3' && !message.isGroupMsg) {
          await client.sendReactions(message.id, '😢');
          await client.sendText(message.from, `Gracias por tu respuesta eligiste ${message.body}`);
          await client.sendText(message.from, 'Para *Seguro Inteligente* es muy importante tu opinión, por favor déjanos tus comentarios a continuación *Mínimo 20 caracteres*');
          inicializacion(message.from, '3','Malo');
          //comentarios.push(message.from);
      }
  });
};


module.exports = {start, clearData}