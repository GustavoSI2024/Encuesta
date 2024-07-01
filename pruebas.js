const axios = require('axios');

let Access_token = '';

const createTicket = async (Nombre,telefono) => {
    let objCrearTicket = {
        departmentId: "212945000208125033", //*** 212945000208125033 => prueba EO******212945000000006907 => servicio al cliente/
        channel: "Chat",
        status: "Open", //*** */
        subject: `PRUEBA PARA MANDAR DATOS EXCELENCIA OPERACIONAL"`, //***NOMBRE COMPLETO */
        language: "Spanish",
        email: "solicitud_bots@segurointeligente.zohodesk.com",
        contactId: "212945000192153009", //** */
        description: 'Pesimo servicio de seguro inteligente',
        cf: {
          cf_nombre_cliente: Nombre,
          cf_numero_de_telefono: telefono
        }
      };
      try {
        let configToken = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://desk.zoho.com/api/v1/tickets",
          headers: {
            "Content-Type": "application/json",
            orgId: "651915269",
            Authorization: `Zoho-oauthtoken 1000.81dfd56a9290b9d104370cb9df7aceb3.22b6c0bb2ec99a72c81ce30804606b73`,
          },
          data: objCrearTicket,
        };
        let response = await axios(configToken);
        console.log(response.data)
      } catch (error) {
        console.log("ERROR AL CREAR TICKET", error);
      }
};

setTimeout(()=>{createTicket('GUSTAVO MENESES SIERRA','5614562120')},3000)

//CONSULTAR TICKET POR ID
const viewTicket = async ()  => {
    try {
        let options = {
            url: "https://desk.zoho.com/api/v1/tickets/212945000227494914",
            method: "get",
            headers: {
                "Content-Type": "application/json",
                orgId: "651915269",
                Authorization: `Zoho-oauthtoken 1000.81dfd56a9290b9d104370cb9df7aceb3.22b6c0bb2ec99a72c81ce30804606b73`,
            }
        }
        let response = await axios(options)
        console.log(response.data)
    } catch (error) {
        console.log('OCURRIO UN ERROR AL CONSULTAR EL TICKET',error)
    }
}

//viewTicket()

let accessToken = '';

//SE REGENERA TOKEN 
const regenerarToken = async () => {
    setInterval(async () => {
          await refreshToken();
    },55 * 60 * 1000); //55 minutos en milisegundos55 * 60 * 1000
  };

//SE REFRESCA TOKEN
const refreshToken = async () => {
    const options = {
        url: "https://accounts.zoho.com/oauth/v2/token",
        method: "post",
        params: {
            refresh_token: "1000.2599f2fdccf7e3a64bbfb032061c8527.3ecb39190d545df6acf904b7a21387b0",
            client_id: "1000.ZUX6JVS98SECVRGGK6P336UUJVU4FF",
            client_secret: "2712cde083955cc908eae50b68676eb90aa6a4ced9",
            grant_type: "refresh_token" 
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        
    };
    try {
        let response = await axios(options);
        console.log(response.data)
        accessToken = await response.data.access_token;
        console.log("Nuevo token generado correctamente",accessToken)

    } catch (error) {
        console.log("ERROR AL GENERAR EL TOKEN ",error);
    }
};


const data = {
    modifiedTime: '2023-12-12T19:48:24.000Z',
    subCategory: null,
    statusType: 'Open',
    subject: 'Seguimiento satisfaccion al cliente opcion 2',
    dueDate: null,
    departmentId: '212945000000006907',
    channel: 'Chat',
    onholdTime: null,
    language: 'Spanish',
    source: {
      appName: null,
      extId: null,
      permalink: null,
      type: 'SYSTEM',
      appPhotoURL: null
    },
    resolution: null,
    sharedDepartments: [],
    closedTime: null,
    approvalCount: '0',
    isOverDue: false,
    isTrashed: false,
    createdTime: '2023-12-12T19:48:23.000Z',
    id: '212945000233735498',
    isResponseOverdue: false,
    customerResponseTime: '2023-12-12T19:48:23.000Z',
    productId: null,
    contactId: '212945000192153009',
    threadCount: '1',
    secondaryContacts: [],
    priority: null,
    classification: null,
    commentCount: '0',
    taskCount: '0',
    accountId: '212945000192162067',
    phone: null,
    webUrl: 'https://desk.zoho.com/support/segurointeligente/ShowHomePage.do#Cases/dv/212945000233735498',
    isSpam: false,
    status: 'Nuevo',
    entitySkills: [],
    ticketNumber: '791005',
    customFields: {
      'Línea de Negocio': null,
      Motivo: null,
      'Tipo campaña': null,
      'Observaciones adicionales programada': null,
      'Resolución': null,
      'Apellido Paterno': null,
      'Opcion de pago': null,
      Ramo: null,
      'Resultado de Reclutamiento': null,
      'OT / Póliza': null,
      'Correo electrónico 1': null,
      'Fecha Resuelto': null,
      'Subárea que solicita': null,
      'Clasificación-TI': null,
      'Apellido Materno': null,
      Gerencia: null,
      'Observaciones de la ejecución': null,
      'Folio aseguradora': null,
      Oportunidad: null,
      'Estatus de Solicitud': null,
      'Tipo de bot': null,
      'Fecha de nacimiento1': null,
      Solicitud: null,
      'Nombre de Campaña': null,
      'Tipo de pago': null,
      'Satisfacción WhatsApp': null,
      prueba: 'false',
      'Código postal1': null,
      'Prima cotizada': null,
      'Nombre del bot': null,
      'Tiempo de ejecución': null,
      'Movimiento GMM': null,
      'Nombre del cliente': null,
      'Fecha de nacimiento': null,
      'Fecha Ganado': null,
      Junta: null,
      'Número de teléfono 1': null,
      'Resultado Cobranza': null,
      Despacho: null,
      'Área solicitante': null,
      'Movimiento a realizar': null,
      'Motivo Estatus': null,
      'Aseguradora 1': null,
      'Aseguradora 2': null,
      'Número de OT': null,
      'Aseguradora 3': null,
      'ID CRM': null,
      'Aseguradora 4': null,
      'Prima Neta 3': null,
      'Prima Neta 4': null,
      'Prima Neta 1': null,
      'Prima Neta 2': null,
      'Sub Ramo': null,
      'Tamaño de la muestra': null,
      'Observaciones adcionales ejec. programada': null,
      'Fecha/Hora Actualización Pendiente': null,
      Asignacion: null,
      'Lugar de Entrega': null,
      Tipo: null,
      'Origen de Contacto': null,
      'Clasificación': null,
      Nombre: null,
      'Descripción de unidad': null,
      Aseguradora: null,
      Producto: null,
      'Ejecución realizada por:': null,
      'Enviado a Servicio AXA': 'false',
      'Tipo de ejecución': null,
      Endoso: null,
      'Medio de pago': null,
      Origen: null,
      'Área que solicita': null,
      'Prima Colocada': null,
      'Número de póliza': null,
      'Fecha de pago': null,
      Fecha_Mod: null,
      'Fecha de inicio de ejecución': null,
      'Aplicar forma de pago': null,
      'Motivo de cancelación': null,
      'Fecha sugerida de entrega': null,
      'Póliza anterior': null,
      Sexo1: null,
      Imputabilidad: null,
      'Número de factura ligada al trámite': null,
      'opción de cliente': null,
      'Nombre de la campaña': null,
      Ubicacion: null,
      'Sexo:': null,
      Area: null,
      'Información Completa': 'false',
      'Tipo de ejecución:': null,
      'Selección múltiple 2': null,
      'Selección múltiple 1': null,
      Observaciones: null,
      'Ejecución realizada en:': null,
      Tema: null,
      'Tipo de Cliente': null,
      Inciso: null,
      'opción de cliente EO': null,
      'Código postal': null,
      'Prima objetivo': null,
      Ramos: null,
      'Tipo de negocio': null,
      'Nombre del solicitante': null,
      'Número teléfonico': null,
      'Fecha de ejecución': null,
      'Correo electrónico del cliente': null,
      ' Experiencia del Asegurado': null,
      'Fecha y hora de ejecución': null,
      Destino: null,
      Subcategori: null,
      'Ejecutivo de Servicio AXA': null,
      'Monto pagado con IVA': null,
      Departamento: null,
      'Número entero 1': null,
      'Tipo ejecución': null,
      'Correo electrónico': null,
      'Nombre del cliente1': null,
      'Máquina ejecución': null
    },
    isArchived: false,
    description: 'sdasdsd sdsadsad asdsadsdsadsadsd',
    timeEntryCount: '0',
    channelRelatedInfo: null,
    responseDueDate: null,
    isDeleted: false,
    modifiedBy: '212945000153582686',
    email: 'cotizacion_ventas@segurointeligente.zohodesk.com',
    layoutDetails: { id: '212945000000089011', layoutName: 'Servicio al Cliente' },
    channelCode: null,
    cf: {
      cf_numero_de_ot: null,
      cf_movimiento_a_realizar: null,
      cf_codigo_postal: null,
      cf_ot_poliza: null,
      cf_medio_de_pago: null,
      cf_codigo_postal1: null,
      cf_prima_cotizada: null,
      cf_poliza_anterior: null,
      cf_fecha_de_pago: null,
      cf_nombre_del_cliente: null,
      cf_prueba: 'false',
      cf_tipo: null,
      cf_tipo_de_ejecucion: null,
      cf_opcion_de_pago: null,
      cf_motivo: null,
      cf_destino: null,
      cf_ejecutivo_de_servicio_axa: null,
      cf_sub_ramo: null,
      cf_gerencia: null,
      cf_correo_electronico: null,
      cf_opcion_de_cliente_eo: null,
      cf_fecha_hora_actualizacion_pendiente: null,
      cf_observaciones_adcionales_ejec_programada: null,
      cf_nombre_de_campana: null,
      cf_actividad_servicio_al_cliente: null,
      cf_nombre_de_la_campana: null,
      cf_observaciones_adicionales_programada: null,
      cf_subcategori: null,
      cf_seleccion_multiple_1: null,
      cf_motivo_estatus: null,
      cf_seleccion_multiple_2: null,
      cf_numero_entero_1: null,
      cf_mensajero: null,
      cf_tipo_campana: null,
      cf_numero_de_poliza: null,
      cf_subarea_que_solicita: null,
      cf_nombre_del_bot: null,
      cf_inciso: null,
      cf_prima_neta_1: null,
      cf_prima_neta_2: null,
      cf_fecha_mod: null,
      cf_nombre_del_cliente1: null,
      cf_numero_de_telefono_1: null,
      cf_nombre_del_solicitante: null,
      cf_prima_neta_3: null,
      cf_informacion_completa: 'false',
      cf_prima_neta_4: null,
      cf_enviado_a_servicio_axa: 'false',
      cf_fecha_de_inicio_de_ejecucion: null,
      cf_tiempo_de_ejecucion: null,
      cf_fecha_y_hora_de_ejecucion: null,
      cf_apellido_materno: null,
      cf_opcion_de_cliente: null,
      cf_id_crm: null,
      cf_area_solicitante: null,
      cf_oportunidad: null,
      cf_fecha_sugerida_de_entrega: null,
      cf_observaciones: null,
      cf_monto_pagado_con_iva: null,
      cf_maquina: null,
      cf_fecha_de_ejecucion: null,
      cf_tipo_de_ejecucion_1: null,
      cf_estatus_de_solicitud: null,
      cf_origen: null,
      cf_nombre: null,
      cf_clasificacion_ti: null,
      cf_fecha_resuelto: null,
      cf_picklist_1: null,
      cf_tipo_de_bot: null,
      cf_tipo_ejecucion: null,
      cf_motivo_de_cancelacion: null,
      cf_area: null,
      cf_endoso: null,
      cf_apellido: null,
      cf_linea_de_negocio: null,
      cf_resultado_de_reclutamiento: null,
      cf_sexo: null,
      cf_prima_objetivo: null,
      cf_tamano_de_la_muestra: null,
      cf_tema: null,
      cf_fecha_ganado: null,
      cf_junta: null,
      cf_solicitud: null,
      cf_area_que_solicita: null,
      cf_ubicacion: null,
      cf_correo_electronico_del_cliente: null,
      cf_satisfaccion_whats_app: null,
      cf_determinacion: null,
      cf_lista_de_seleccion_1: null,
      cf_aseguradora: null,
      cf_ramos: null,
      cf_experiencia_del_asegurado: null,
      cf_observaciones_generales_de_ejecucion: null,
      cf_folio_aseguradora: null,
      cf_correo_electronico_1: null,
      cf_tipo_de_pago: null,
      cf_despacho: null,
      cf_sexo1: null,
      cf_descripcion_de_unidad: null,
      cf_fecha_de_nacimiento: null,
      cf_tipo_de_negocio: null,
      cf_ejecucion_realizada_en: null,
      cf_numero_telefonico: null,
      cf_ramo: null,
      cf_numero_de_factura_ligada_al_tramite: null,
      cf_resultado_cobranza: null,
      cf_origen_de_contacto: null,
      cf_fecha_de_nacimiento1: null,
      cf_imputabilidad: null,
      cf_producto: null,
      cf_prima_colocada: null,
      cf_lugar_de_entrega: null,
      cf_ejecucion_de: null,
      cf_aseguradora_1: null,
      cf_movimiento_a_realizar_gmm: null,
      cf_aseguradora_2: null,
      cf_aseguradora_3: null,
      cf_aplicar_forma_de_pago: null,
      cf_aseguradora_4: null
    },
    slaId: null,
    layoutId: '212945000000089011',
    assigneeId: null,
    teamId: null,
    attachmentCount: '0',
    isEscalated: false,
    category: 'Servicio al Cliente'
  }

