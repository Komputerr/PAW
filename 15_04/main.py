
def read_graph(filename:str):
    with open(filename,'r') as f:
        lines:list[str] = f.read().split('\n')
        n:int = int(lines.pop(0))
        graph: list[list[int]] = []
        for line in lines:
            line:list[int] = list(map(int,line.split(' ')))
            line.pop(0)
            graph.append(line)
    return graph,n

def write_neighbours_list(lista:list[list[int]]):
    for i, l in enumerate(lista):
        nodes= ", ".join(list(map(str,l)))
        print(f"Sąsiadami wierzchołka {i} są: {nodes}")

def list_to_matrix(lista:list[list[int]]):
    matrix:list[list[int]] = []
    for i in range (len(lista)):
        matrix.append([])
        for j in range (len(lista)):
            matrix[i].append(1 if j in lista[i] else 0)
    return matrix

def write_matrix(matrix):
    for i in range (len(matrix)):
        for j in range (len(matrix)):
            print(matrix[i][j],end=" ")
        print()

def main():
    lista,n = read_graph('graph_test.txt')
    write_neighbours_list(lista)
    matrix = list_to_matrix(lista)
    write_matrix(matrix)

if __name__ == '__main__':
    main()