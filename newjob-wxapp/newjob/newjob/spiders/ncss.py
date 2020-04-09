# -*- coding: utf-8 -*-
import json
import time

import scrapy
from scrapy_redis.spiders import RedisSpider

from newjob.items import NewjobItem


class NcssSpider(RedisSpider):
    name = 'ncss'
    allowed_domains = ['job.ncss.cn']
    _timestamp = round(time.time() * 1000)

    # start_urls = [
    #     'https://job.ncss.cn/student/jobs/jobslist/ajax/?jobType=&areaCode=&jobName=&monthPay=&industrySectors=&property=&categoryCode=01&offset=1&limit=10&keyUnits=&_={}'
    #         .format(_timestamp)
    # ]
    redis_key = "newjob"

    def parse(self, response):
        jbody = json.loads(response.body.decode())
        models = jbody['data']['list']
        if jbody['errors'] == []:
            for dict in models:
                item = NewjobItem()
                item['jobName'] = dict['jobName']
                item['highMonthPay'] = dict['highMonthPay']
                item['updateDate'] = dict['updateDate']
                item['lowMonthPay'] = dict['lowMonthPay']
                item['headCount'] = dict['headCount']
                item['publishDate'] = dict['publishDate']
                item['degreeName'] = dict['degreeName'].strip()
                item['recName'] = dict['recName'].strip()
                item['areaCodeName'] = dict['areaCodeName']
                item['jobId'] = dict['jobId'].strip()
                item['detail_href'] = 'https://job.ncss.cn/student/jobs/' + item['jobId'] + '/detail.html'
                item['recScale'] = dict['recScale']
                item['sortPriority'] = dict['sortPriority']
                item['recTags'] = dict['recTags']
                item['recProperty'] = dict['recProperty']
                item['userType'] = dict['userType']
                item['recId'] = dict['recId']
                item['keyUnits'] = dict['keyUnits']

                # print('NewjobItem')
                # print(item)
                yield scrapy.Request(
                    item['detail_href'],
                    callback=self.parse_detail,
                    meta={"item": item}
                )

            # 翻页
            offset = jbody['data']['pagenation']['offset'] + 1
            total = jbody['data']['pagenation']['total']
            if offset <= total:
                next_url = ['https://job.ncss.cn/student/jobs/jobslist/ajax/?jobType=&areaCode=&jobName=&monthPay=&industrySectors=&property=&categoryCode=01&offset={}&limit=10&keyUnits=&_={}'
            .format(offset, self._timestamp)]
                yield scrapy.Request(
                    next_url[0],
                    callback=self.parse
                )

    def parse_detail(self, response):
        item = response.meta["item"]
        item['city'] = response.xpath(
            "//div[@class='site-tag']/text()"
        ).extract_first()
        # item['content'] = response.xpath(
        #     "//pre[@class='mainContent mainContent']/text()"
        # ).extract()
        item['location'] = response.xpath(
            "//span[@id='companyNameMap']/text()"
        ).extract_first()
        # print(item)
        yield item

