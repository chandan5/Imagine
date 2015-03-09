@auth.requires_login()
def index():
    editimage = session.editstring
    session.editstring = ''
    username = session.auth.user.username
    row = db(db.auth_user.username == username).select()
    return dict(row = row[0], editimage = editimage)

@auth.requires_login()
def saveimage():
    title = request.vars.title
    imgstring = request.vars.imgstring
    imgtype = request.vars.imgtype
    db.user_sketches.insert(username=session.auth.user.username, imgtype=imgtype, datastring=imgstring, title=title)
    return "True"
