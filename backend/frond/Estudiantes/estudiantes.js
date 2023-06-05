import { getEstudiantes } from "./API.js";

addEventListener('DOMContentLoaded', cargarEstudiantes)

async function cargarEstudiantes(){
    const tablaEstudiantes = document.querySelector("#tabla")
    const estudiantes = await getEstudiantes()
    console.log(estudiantes);
    estudiantes.forEach(element => {
        const {id,nombre,especialidad,imagen,edad,promedio,nivelCAmpus,nivelIngles,direccion,celular,ingles,Ser,Review,Skills,Asitencia} = element
        tablaEstudiantes.innerHTML+=`
        <tr class="cards" nombre="${nombre}"
        imagen="${imagen}"
        edad="${edad}" 
        promedio="${promedio}" 
        nivelCAmpus="${nivelCAmpus}" 
        nivelIngles="${nivelIngles}"
        especialidad="${especialidad}"
        direccion="${direccion}" 
        celular="${celular}" 
        ingles="${ingles}" 
        Ser="${Ser}" 
        Review="${Review}" 
        Skills="${Skills}" 
        Asitencia="${Asitencia}"
        >
            <th scope="row" id="${id}">${id}</th>
            <td id="${id}">${nombre}</td>
            <td id="${id}">${especialidad}</td>
            <td id="${id}"><img src="images/${imagen}" id="${id}" alt="..."></td>
            <td id="${id}"><button type="button" class="btn btn-info">Notas</button></td>
        </tr>
        `
    })
}
detalles()

function detalles (){
    const tablaEstudiantes = document.querySelector("#tabla")
    tablaEstudiantes.addEventListener("click", e => {
        console.log(e.target);
        if(e.target.getAttribute('id')){
            const atributos = e.target.getAttribute('id');
            const elemento = document.getElementById(atributos)
            const padre = elemento.parentNode
            console.log(padre);

            const imagen =  padre.getAttribute('imagen')
            const nombre =  padre.getAttribute('nombre')
            const edad =  padre.getAttribute('edad')
            const promedio =  padre.getAttribute('promedio')
            const nivelCAmpus =  padre.getAttribute('nivelCAmpus')
            const nivelIngles =  padre.getAttribute('nivelIngles')
            const especialidad =  padre.getAttribute('especialidad')
            const direccion =  padre.getAttribute('direccion')
            const celular =  padre.getAttribute('celular')
            const ingles =  padre.getAttribute('ingles')
            const Ser =  padre.getAttribute('Ser')
            const Review =  padre.getAttribute('Review')
            const Skills =  padre.getAttribute('Skills')
            const Asitencia =  padre.getAttribute('Asitencia')

            const detalles = document.querySelector('#detalles')
            detalles.innerHTML=``
            detalles.innerHTML=`
            <div class="contanerDetalles">
            <div class="datos">
              <div class="d-flex"><img src="images/${imagen}" alt="" class="m-2">
                <button class="btn btn-danger" style="height: 40px;">Eliminar</button></div>
                <h5>${nombre}</h5>
                  <h5>Edad: ${edad}</h5>
                  <h5>Promedio: ${promedio}</h5>
                  <h5>Nivel: ${nivelCAmpus}</h5>
                  <h5>Ingles: ${nivelIngles}</h5>
                  <h5>Especialidad: ${especialidad}</h5>
                  <h5>Direccion: ${direccion}</h5>
                  <h5 style="background-color: rgb(255, 196, 0);">Celular: ${celular}</h5>
            </div>
            </div>
            <div id="chart1" class="charts"></div>
            `
            const getOptionCharts1 = () =>{
                return {
                    tooltip: {
                      trigger: 'item'
                    },
                    legend: {
                      top: '5%',
                      left: 'center',
                      // doesn't perfectly work with our tricks, disable it
                      selectedMode: false
                    },
                    series: [
                      {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '70%'],
                        // adjust the start angle
                        startAngle: 180,
                        label: {
                          show: true,
                          formatter(param) {
                            // correct the percentage
                            return param.name + ' (' + param.percent * 2 + '%)';
                          }
                        },
                        data: [
                          { value: 1048, name: 'Search Engine' },
                          { value: 735, name: 'Direct' },
                          { value: 580, name: 'Email' },
                          { value: 484, name: 'Union Ads' },
                          { value: 300, name: 'Video Ads' },
                          {
                            // make an record to fill the bottom 50%
                            value: 1048 + 735 + 580 + 484 + 300,
                            itemStyle: {
                              // stop the chart from rendering this piece
                              color: 'none',
                              decal: {
                                symbol: 'none'
                              }
                            },
                            label: {
                              show: false
                            }
                          }
                        ]
                      }
                    ]
                  };
            }

            const chart1 = echarts.init(document.getElementById('chart1'))
            chart1.setOption(getOptionCharts1())
        }
    })

}