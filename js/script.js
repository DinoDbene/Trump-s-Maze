// Ativa a primeira tela da div "menu-bar"
function tela2() {
    document.getElementsByClassName("button")[0].style.display = 'none'
    document.getElementsByClassName("button")[1].style.display = 'none'

    document.getElementsByClassName("button-2")[0].style.display = 'inline-block'
    document.getElementsByClassName("button-2")[1].style.display = 'inline-block'
    document.getElementsByClassName("button-2")[2].style.display = 'inline-block'

    document.getElementsByClassName("go-back")[0].style.display = 'inline-block' 
}

// Ativa a segunda tela da div "menu-bar"
function tela1() {
    document.getElementsByClassName("button")[0].style.display = 'inline-block'
    document.getElementsByClassName("button")[1].style.display = 'inline-block'

    document.getElementsByClassName("button-2")[0].style.display = 'none'
    document.getElementsByClassName("button-2")[1].style.display = 'none'
    document.getElementsByClassName("button-2")[2].style.display = 'none'

    document.getElementsByClassName("go-back")[0].style.display = 'none' 

    initMaze()
    walls = []
    borderCreate()
    createWalls()
    path = false
}

// Verifica se o "Trump" ou o "Dollar" esta selecionado na segunda tela para que posso movimentar-se
function selection(valor) {
    if (valor===1) {
        player.isSelected = true
        goal.isSelected = false

        document.getElementsByClassName("button-2")[0].style.backGroundColor = 'gray'
    }
    
    if (valor===2) {
        player.isSelected = false
        goal.isSelected = true

        document.getElementsByClassName("button-2")[0].style.backGroundColor = 'gray'
    }
}

let buscado = 0
let path = false

// função controla se o path sera desenhado na tela ou nao
function showPath() {
    console.log( path)
    console.log("y: ", Math.floor((player.y/(tileSize+2)+0.35)),"x: ", Math.floor((player.x/(tileSize+2)+0.35)))

    if (path) {
        path = false
    } else {
        path = true
    }
}

// Configurando o Canvas
    var cnv =  document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var WIDTH = cnv.width
    var HEIGHT = cnv.height
// Configurando os enventos do teclado
    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40
    var mvLeft = mvUp = mvRight = mvDown = false

    var tileSize = 31
    var spriteSize = 100
// Inserindo o sprit sheet do personagem
    var trump = new Image()
        trump.src = "img/trump_run.png"
        trump.addEventListener("load", function() {
        requestAnimationFrame(loop, cnv)

    }, false)
// Inserindo o sprit sheet do goal
    var dollar = new Image()
        dollar.src = "img/dollar.png"
        dollar.addEventListener("load", function() {
        requestAnimationFrame(loop, cnv)

    }, false)

    var walls = []

// Criando labirinto vazio

    var maze = [[{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {},  {}, {}, {}, {}, {}, {}, {}],                   
            ]

    // Inicializa cada objeto da matriz
    function initMaze() {
        for (var row in maze) {
            for (var column in maze[row]) {
                maze[row][column].row = Number(row)
                maze[row][column].column = Number(column)
                maze[row][column].distance = Number.MAX_VALUE
                maze[row][column].dad = null
                maze[row][column].value = 0
                maze[row][column].status = 'D' // Existe 3 status{Desconhecido = D, Conhecido = C, Visitado = V}
            }
        } 
    }

     initMaze()
    
    let nInicio = maze[1][1]
    let nFinal = maze[17][17]

    // configuranda os atributos do personagem
    const player = {
        x: (nInicio.column)*(tileSize+2),
        y: (nInicio.row)*(tileSize+2),
        width: tileSize-10,
        height: tileSize-10,
        velocidade: 1,
        srcX: 0,
        srcY: 0,
        countAnim: 0,
        isSelected: false
    }

    // configuranda os atributos do alvo
    const goal = {
        x: (nFinal.column)*(tileSize),
        y: (nFinal.row)*(tileSize),
        width: tileSize,
        height: tileSize,
        velocidade: 1,
        srcX: 0,
        srcY: 0,
        isSelected: false
    }
    // Verifica se o numero é impar
    impar = num => num%2!=0? true : false

    // Gera numero pseudo-aleatório dentro do escopo do labirinto
    rand = () => Math.floor(Math.random()*17)+1
    
    var preenchimento = 0
    // Gera borda do labirinto
    function borderCreate() {
        
        for (var row in maze) {
            for (var column in maze[row]) {
                if (column == 0 || column == 18 || row == 0 || row == 18) {
                    maze[row][column].value = 1
                    preenchimento++
                }
            }
        }
        console.log("preenchimento: ", preenchimento)
    }
    // GERA A GRADE E VAI ZERANDO ALGUNS EXCETO AS DUPLAS IMPARES
    function gridCreate(){

        for (var row in maze) {
            for (var column in maze[row]) {
                
                if (!impar(row) || !impar(column)) {
                    maze[row][column].value = 1
                    preenchimento++
                }
            }
        }

        walls = []
        createWalls()
    }
    
    

    /* 
        Pega uma matriz em grades e vai limpando alguns blocos aleatoriamente 
        até formar um labirinto 
    */
    function randClean() {
// 156 - 352
        while (preenchimento>156) {
            let linha = rand()
            let coluna = rand()

            if ((impar(linha) != impar(coluna))) {
                             
                maze[linha][coluna].value = 0
                preenchimento--
                
            }
        }
    } 
    borderCreate()

    // Gera o labirinto pseudo-randomico
    function randMaze() {      
        gridCreate()
        preenchimento = 352
        randClean()

        walls = []
        createWalls()
    }
    

    var queue = []
/*
    Verifica se o goal ja foi alcançado
    Recebe um vizinho e o goal como paramentros
*/
    function goalReached(Neighbor, nFinal) {
        if (Neighbor.row === nFinal.row && Neighbor.column === nFinal.column) {
            queue = []
            return true
        } else {
            return false
        }       
    }
    // Atualiza as informações dos vizinhos que podem ser visitados
    function checkNeighbor(neighbor) {
        neighbor.status = 'C'
        neighbor.distance = currentNode.distance+1
        neighbor.dad = currentNode
        queue.push(neighbor)         
    }

/*  A função recebe uma matriz(maze), uma coordenada de inicio(maze[x1][y1]) e uma coordenada de fim(maze[x2][y2])
    e retorma uma matriz com o caminho
*/  
    function buscaEmLargura(maze, nInicio, nFinal) {
        // Como o algoritmo pode ser chamado varias vezes...
        // Reinicializamos a queue e alguns atributos do Maze antes de fazer a busca novamente
        queue = []
        nInicio.distance = 0
        queue.push(nInicio)

        for (let row in maze) {
            for (let column in maze) {
                maze[row][column].status = 'D'
                maze[row][column].distance = Number.MAX_VALUE
                maze[row][column].dad = null
            }
        }

        while(queue.length != 0) {
            currentNode = queue.shift()

            //Define os 4 vizinhos possiveis
            let leftNeighbor = maze[currentNode.row][currentNode.column-1]
            let rightNeighbor = maze[currentNode.row][currentNode.column+1]
            let topNeighbor = maze[currentNode.row-1][currentNode.column]
            let bottomNeighbor = maze[currentNode.row+1][currentNode.column]
            
 
            // Verificando vizinho da esquerda
            if (leftNeighbor.value === 0 && leftNeighbor.status === 'D') {
                checkNeighbor(leftNeighbor)
                
                // Verifica se o goal foi alcançado
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

// Montando o array do muros para as colisões
    function createWalls() {
        for (let row in maze) {
            for (let column in maze[row]) {
                let tile = maze[row][column].value
    
                if (tile === 1) {
                   var wall = {
                       x: (tileSize)*column,
                       y: (tileSize)*row,
                       width: tileSize,
                       height: tileSize
                   }
                   walls.push(wall)
                }
            }
        }
    }
    
    createWalls()

// Configurando as colisões
    function blockRectangle(objA, objB) {
        var distX = (objA.x + objA.width/2) - (objB.x + objB.width/2)
        var distY = (objA.y + objA.height/2) - (objB.y + objB.height/2)

        var sumWidth = (objA.width + objB.width)/2
        var sumHeight = (objA.height + objB.height)/2

        if ((Math.abs(distX) < sumWidth) && (Math.abs(distY) < sumHeight)) {
            var overlapX = sumWidth - Math.abs(distX)
            var overlapY = sumHeight - Math.abs(distY)

            if (overlapX > overlapY) {
                objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY
            } else {
                objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX
            }
        }
    }

// Configurando eventos do teclado part 2 kk
    window.addEventListener("keydown", keydownHandler, false)
    window.addEventListener("keyup", keyupHandler, false)
   
    // Verifica se o botão esta sendo precionado
    function keydownHandler(e) {
        var key = e.keyCode

        switch (key) {
            case LEFT:
                mvLeft = true
            break;
            case UP:
                mvUp = true
            break;
            case RIGHT:
                mvRight = true
            break;
            case DOWN:
                mvDown = true
            break;
        }
    }
    // Verifica se o botão esta solto
    function keyupHandler(e) {
        var key = e.keyCode

        switch (key) {
            case LEFT:
                mvLeft = false
            break;
            case UP:
                mvUp = false
            break;
            case RIGHT:
                mvRight = false
            break;
            case DOWN:
                mvDown = false
            break;
        }
    }
// Função de atualizar a tela
    function update() {

        function movePlayer() {
            // Quando o personagem se move para a direita ou para a esquerda
            if (mvLeft && !mvRight) {
                player.x -= player.velocidade
                player.srcY = spriteSize*3
            } else if (mvRight && !mvLeft) {
                player.x += player.velocidade
                player.srcY = spriteSize*1
            }
            // Quando o personagem se move para cima ou para a baixo
            if (mvUp && !mvDown) {
                player.y -= player.velocidade
                player.srcY = spriteSize*2
            } else if (mvDown && !mvUp) {
                player.y += player.velocidade
                player.srcY = spriteSize*0
            }
            // Definindo a velocidade da animação
            if (mvLeft || mvRight || mvDown || mvUp) {
                
                if (player.countAnim>75) {
                    player.countAnim = 0
                } else {
                    player.countAnim++
                }

                player.srcX = spriteSize*Math.floor(player.countAnim/15)
            }

            if (!mvLeft && !mvRight && !mvDown && !mvUp) {
                player.srcX = 1 * spriteSize
            }
        }

        function moveGoal() {
            if (mvLeft && !mvRight) {
                goal.x -= goal.velocidade
            } else if (mvRight && !mvLeft) {
                goal.x += goal.velocidade
            }
            // Quando o personagem se move para cima ou para a baixo
            if (mvUp && !mvDown) {
                goal.y -= goal.velocidade
            } else if (mvDown && !mvUp) {
                goal.y += goal.velocidade
            }
        }
        
        if (player.isSelected) {
            movePlayer()
        } 

        if (goal.isSelected) {
            moveGoal()
        }

// Verificando se o personagem esta colidindo com o muro
        for (var i in walls) {
            var wall = walls[i]
            blockRectangle(player, wall)
            blockRectangle(goal, wall)
        }
    }
// Função que renderiza a matriz "maze" e a animação do personagem
    function render() {
        // Labirinto
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        ctx.save()
        for (let row in maze) {
            for (let column in maze[row]) {
                let tile = maze[row][column].value

                if (tile === 1) {
                    let x = column*tileSize
                    let y = row*tileSize
                    ctx.fillRect(x, y, tileSize-2, tileSize-2)
                }
            }
        }
        // Desenha o caminho
        if (path) {
            
            let pColumn = Math.floor((player.x/(tileSize)+0.4))
            let pRow =  Math.floor((player.y/(tileSize)+0.6))

            let gColumn = Math.floor((goal.x/(tileSize)+0.4))
            let gRow =  Math.floor((goal.y/(tileSize)+0.6))


            if (buscado === 0){
            
                result = buscaEmLargura(maze, maze[pRow][pColumn], maze[gRow][gColumn])
                buscado++
            }

            // Quando o algoritmo não encontrar um caminho ele retorna uma string
            // Se encontra ele retorna um objeto
            if (typeof(result) === "object") {

                ctx.fillStyle = "#00f"
                for (var node = result.final; node !== null; node = node.dad) { 
                    let x = (node.column*tileSize)+12
                    let y = (node.row*tileSize)+12
                    ctx.fillRect(x, y, 5, 5)
                }
            }
            ctx.restore()
        } else {
            buscado = 0
        }

        // Rederiza o Dollar enquando o player não estiver encima dele
        if (!(player.x > goal.x-10 && player.x < goal.x+10
            && player.y > goal.y-10 && player.y < goal.y+10)) {
            ctx.drawImage(
                dollar,
                goal.srcX, goal.srcY, 550, 550,
                goal.x, goal.y, goal.width, goal.height
            )
        } else {
            console.log("Você conseguiu!!")
        }
        
        // Renderiza o personagem
        ctx.drawImage(
            trump,
            player.srcX, player.srcY, spriteSize, spriteSize,
            player.x-15, player.y-21, player.width+30, player.height+30
        )
        
    }
// Faz com que o jogo continue iterando
    function loop() {
        update()
        render()
        requestAnimationFrame(loop, cnv)
    }


