# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import time

import pymysql
from scrapy.utils.project import get_project_settings

settings = get_project_settings()

class NewjobPipeline(object):

    def timestamp(self, Date):
        Date = int(Date) / 1000
        timea = time.localtime(Date)
        timeb = str(time.strftime("%Y-%m-%d %H:%M", timea))
        return timeb

    def process_item(self, item, spider):
        publishDate = item['publishDate']
        if publishDate:
            item['publishDate'] = self.timestamp(publishDate)
        updateDate = item['updateDate']
        if updateDate:
            item['updateDate'] = self.timestamp(updateDate)
        degreeName = item['degreeName']
        if degreeName:
            item['degreeName'] = degreeName.split('及以上')[0]
        areaCodeName = item['areaCodeName']
        city = item['city']
        location = item['location']
        if areaCodeName == '全国':
            item['areaCodeName'] = location.split('省')[0]
        if city == '全国':
            item['city'] = location.split('省')[-1].split('市')[0]
        else:
            item['city'] = city.split('省')[-1].split('市')[0]
        return item




class MySQLPipeline(object):

    def __init__(self):
        # 连接数据库
        self.connect = pymysql.connect(
            host=settings['MYSQL_HOST'], user=settings['MYSQL_USER'],
        passwd=settings['MYSQL_PASSWD'], db=settings['MYSQL_DBNAME'])
        # 游标
        self.cursor = self.connect.cursor()
        print('连接数据库成功')

    def process_item(self, item, spider):
        # 插入sql语句
        insert_sql = """
        insert into newjob(jobName,highMonthPay,updateDate,
        lowMonthPay,headCount,publishDate,degreeName,recName,
        areaCodeName,jobId,detail_href,recScale,sortPriority,recTags,recProperty,
        userType,recId,keyUnits,city,location) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
        %s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """
        # 操作
        self.cursor.execute(insert_sql, (item['jobName'],
                                         item['highMonthPay'],
                                         item['updateDate'],
                                         item['lowMonthPay'],
                                         item['headCount'],
                                         item['publishDate'],
                                         item['degreeName'],
                                         item['recName'],
                                         item['areaCodeName'],
                                         item['jobId'],
                                         item['detail_href'],
                                         item['recScale'],
                                         item['sortPriority'],
                                         item['recTags'],
                                         item['recProperty'],
                                         item['userType'],
                                         item['recId'],
                                         item['keyUnits'],
                                         item['city'],
                                         item['location']))
        # 提交
        self.connect.commit()

    def close_spider(self, spider):
        # 关闭操作
        self.cursor.close()
        self.connect.close()