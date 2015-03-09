f = open('finallist.csv')
for i in f.readlines():
   w = i.replace(' ', '')
   print w.replace('\n', '')
f.close()

