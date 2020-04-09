'''
Created by 七月 on 2020/3/6
'''
from flask import Flask
from control import job

app = Flask(__name__)

@app.route('/first/<map>', methods=['GET','POST'])
def first(map):
    if map == 'bar':
        return job.bar_func()
    if map == 'line':
        return job.line_func()
    if map == 'scale':
        return job.scalepie_func()
    if map == 'property':
        return job.propertypie_func()

if __name__ == "__main__":
    app.debug = True
    app.run(threaded=True)