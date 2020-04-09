'''
Created by 七月 on 2020/3/6
'''
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://root:123456@localhost:3306/graduation?charset=utf8")