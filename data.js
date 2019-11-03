const jsonfile = require('jsonfile-promised');
const fs = require('fs');



module.exports = {
    salvaDados(curso, tempoEstudado){
        let arquivoCurso = __dirname + '/data/' +curso + '.json';
        if(fs.existsSync(arquivoCurso)){
            this.adicionaTempoAoCurso(arquivoCurso, tempoEstudado);
    } else {
        this.criaArquivoDeCurso(arquivoCurso, {}).then(() => {
            this.adicionaTempoAoCurso(arquivoCurso, tempoEstudado);
        });
    }
},
    adicionaTempoAoCurso(arquivoCurso, tempoEstudado){
            let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado  
        }
        jsonfile.writeFile(arquivoCurso, dados, {spaces: 2})
            .then(() => {
                console.log('tempo salvo com sucesso');
            }).catch((err) => {
                console.log(err);
            })
           

        
    },
    criaArquivoDeCurso (nomeArquivo, conteudoArquivo) {
        jsonfile.writeFile(nomeArquivo, conteudoArquivo)
            .then(() => {
                console.log('Aquivo Criadp')
            }).catch((err) => {
                console.log(err);
            });
    },
    pegaDados(nomeCurso) {
        let arquivoCurso = __dirname + '/data/' +nomeCurso + '.json';
        return jsonfile.readFile(arquivoCurso);
    },

    pegaNomeDosCursos(){
        let arquivos = fs.readdirSync(__dirname+'/data');
        let cursos = arquivos.map((arquivo) => {
            return arquivo.substr(0, arquivo.lastIndexOf('.'));    
        })
        return cursos;
    }
}