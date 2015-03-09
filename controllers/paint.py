@auth.requires_login()
def index():
    rows = db(db.ColorCode.id>0).select()
    lcap = map(chr, range(65, 91))
    def func(color):
        count=0
        for i in lcap:
            count+=color.count(i)
        if count is 1:
            return 1
        else:
            return 0
    liscol = []
    length = 0
    for i in rows:
        if func(i.Color):
            liscol.append(i.Color)
    editimage = session.editstring
    session.editstring = ''
    username = session.auth.user.username
    row = db(db.auth_user.username == username).select()
    return dict(r=rows, l=liscol, row = row[0], editimage = editimage)

@auth.requires_login()
def saveimage():
    title = request.vars.title
    imgstring = request.vars.imgstring
    imgtype = request.vars.imgtype
    db.user_sketches.insert(username=session.auth.user.username, imgtype=imgtype, datastring=imgstring, title=title)
    return "True"

@auth.requires_login()
def retcode():
    colorname = request.vars.colour
    colorname=colorname.capitalize()
    row = db(db.ColorCode.Color == colorname).select()
    code = row[0].Code
    return code
