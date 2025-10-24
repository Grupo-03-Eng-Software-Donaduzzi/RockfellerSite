function switchConhecaCursos(elementoMostrado){
    let container = document.querySelector(".conheca-conteudo-animation-container");
    let cursos = document.querySelectorAll(".conheca-conteudo");
    for (curso of cursos) {
        if (curso.id == elementoMostrado){
            let containerRect = container.getBoundingClientRect();
            let elementRect = curso.getBoundingClientRect();
            //let leftPercentage = containerRect.left
            container.style.left = ((((elementRect.left - containerRect.left) / containerRect.width) * -100) + "%");
            console.log(((((elementRect.left - containerRect.left) / containerRect.width) * -100) + "%"));
            console.log(elementRect.left);
        }
    }
}