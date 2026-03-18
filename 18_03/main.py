def zad1():
    string =""
    i = 0
    with open("sygnaly.txt","r") as file:
        for line in file:
            i = i + 1
            if(i%40==0):
                string += line[9]
    print(string)

zad1()

def zad2():
    max = 0
    max_word = ""
    with open("sygnaly.txt","r") as plik:
        for line in plik:
            if(max<len(set(line))-1):
                max = len(set(line))-1
                max_word = line[:-1]
                result = max_word + " " + str(max)
    print(result)

zad2()

def zad3():
    tab=[]
    with open("sygnaly.txt", "r") as plik:
        for line in plik:
            line = line.strip()
            good = True
            for i in range(len(line)):
                for j in range(i,len(line)):
                    a = ord(line[i])
                    b = ord(line[j])
                    diffrence = abs(a-b)
                    if(diffrence>10):
                        good = False
                        break
                if(good==False):
                    break
            if(good==True):
                tab.append(line)
        for i in range(len(tab)):
            print(tab[i])
zad3()