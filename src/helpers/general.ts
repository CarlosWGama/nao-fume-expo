/**
    @author Carlos W. Gama
    Arquivo para criar funções de apoio
**/


/* FORMATA A DATA PARA O ESTILO DESEJADO */
export function dataFormat(data: string, format: 'br-to-database'|'database-to-br' = 'database-to-br') {

    if (format == 'database-to-br') {
        const [ ano, mes, dia ] = data.split('-')
        return `${dia}/${mes}/${ano}`
    } else {
        const [ dia, mes, ano ] = data.split('/')
        return `${ano}-${mes}-${dia}`
    }

}