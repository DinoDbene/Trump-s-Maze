var queue = []
/*
    Verifica se o goal ja foi alcançado
    Recebe um vizinho e o goal como paramentros
*/
    function goalReached(Neighbor, nFinal) {
        if (Neighbor.row === nFinal.row && Neighbor.column === nFinal.column) {
            return true
        } else {
            return false
        }       
    }

    function checkNeighbor(neighbor) {
        if (neighbor.value === 0 && neighbor.status === 'D') {
            console.log("Entro no if: esquerda")
            neighbor.status = 'C'
            neighbor.distance = currentNode.distance+1
            neighbor.dad = currentNode
            queue.push(neighbor)  
        }
    }

/*  A função recebe uma matriz(maze), uma coordenada de inicio(maze[x1][y1]) e uma coordenada de fim(maze[x2][y2])
    e retorma uma matriz com o caminho
*/  
    function buscaEmLargura(maze, nInicio, nFinal) {

        nInicio.distance = 0
        queue.push(nInicio)

        while(queue.length != 0) {
            console.log("Fila: ",queue)
            currentNode = queue.shift()
            console.log("Retirou atual")

            //Define os 4 vizinhos possiveis
            let leftNeighbor = maze[currentNode.row][currentNode.column-1]
            let rightNeighbor = maze[currentNode.row][currentNode.column+1]
            let topNeighbor = maze[currentNode.row-1][currentNode.column]
            let bottomNeighbor = maze[currentNode.row+1][currentNode.column]
            
 
            // Verificando vizinho da esquerda
            if (leftNeighbor.value === 0 && leftNeighbor.status === 'D') {
                checkNeighbor(leftNeighbor)
                
                if (goalReached(leftNeighbor, nFinal)) {
                    return {maze, final: leftNeighbor}
                }
            }
            // Verificando vizinho da direita
            if (rightNeighbor.value === 0 && rightNeighbor.status === 'D') { 
                checkNeighbor(rightNeighbor)

                if (goalReached(rightNeighbor, nFinal)) {
                    return {maze, final: rightNeighbor}
                }
            }
            // Verificando vizinho de cima
            if (topNeighbor.value === 0 && topNeighbor.status === 'D') {
                checkNeighbor(topNeighbor)

                if (goalReached(topNeighbor, nFinal)) {
                    return {maze, final: topNeighbor}
                }
            }
            // Verificando vizinho de baixo
            if (bottomNeighbor.value === 0 && bottomNeighbor.status === 'D') {
               checkNeighbor(bottomNeighbor) 

                if (goalReached(bottomNeighbor, nFinal)) {
                    return {maze, final: bottomNeighbor}
                }
            }

            maze[currentNode.row][currentNode.column].status = 'V'                        
        }

        return console.log("Labirinto sem saida")
    }