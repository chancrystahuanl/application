'''
Created by 七月 on 2020/3/6
'''
import json

from secure import engine
import pandas as pd


def bar_func():
    sql = "select degreeName,count(*) as cc  from newjob GROUP by degreeName order by cc"
    df = pd.read_sql(sql=sql, con=engine)
    for i in list(df.index):
        df['degreeName'][i] = df['degreeName'][i].strip()
    df_agg = df.groupby('degreeName').agg('sum').reset_index().rename(columns={'index': 'degreeName', 'cc': 'cc'}).sort_values(by='cc',ascending=True)
    data = {'category': df_agg['degreeName'].values.tolist(), 'value': df_agg['cc'].values.tolist()}
    return json.dumps(data)


def line_func():
    sql = "select round((sum(lowMonthPay)+sum(highMonthPay))/count(*), 2) as avg_salary,city from newjob where city='北京' or city='上海' or city='深圳' or city='广州' or city='杭州'  or city='天津' or city='成都' group by city ;"
    df = pd.read_sql(sql=sql, con=engine)
    data = {'name': df['city'].values.tolist(), 'value': df['avg_salary'].values.tolist()}
    return json.dumps(data)


def scalepie_func():
    sql = "select recScale,count(*) as cc  from newjob GROUP by recScale order by cc"
    df = pd.read_sql(sql=sql, con=engine)
    df['recScale'].fillna('其他', inplace=True)
    data = {'category': df['recScale'].values.tolist(), 'value': df['cc'].values.tolist()}
    return json.dumps(data)


def propertypie_func():
    sql = "select recProperty,count(*) as cc  from newjob GROUP by recProperty order by cc;"
    df = pd.read_sql(sql=sql, con=engine)
    df_copy = df.copy()
    df_copy['recProperty'][df_copy['recProperty'].str.contains(r'港澳台公司')] = '其他'
    df_copy['recProperty'][df_copy['recProperty'].str.contains(r'机关/事业单位/非营利机构')] = '事业单位机构'
    df_copy['recProperty'][df_copy['recProperty'].str.contains(r'外商独资')] = '外商独资/代表/办事'
    df_copy_agg = df_copy.groupby('recProperty').agg('sum').reset_index().rename(columns={'index': 'recProperty', 'cc': 'sum'})
    data = {'name': df_copy_agg['recProperty'].values.tolist(), 'value': df_copy_agg['sum'].values.tolist()}
    return json.dumps(data)