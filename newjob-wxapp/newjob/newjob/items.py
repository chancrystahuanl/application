# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class NewjobItem(scrapy.Item):
    jobName = scrapy.Field()
    highMonthPay = scrapy.Field()
    updateDate = scrapy.Field()
    lowMonthPay = scrapy.Field()
    headCount = scrapy.Field()
    publishDate = scrapy.Field()
    degreeName = scrapy.Field()
    recName = scrapy.Field()
    areaCodeName = scrapy.Field()
    jobId = scrapy.Field()
    detail_href = scrapy.Field()
    recScale = scrapy.Field()
    sortPriority = scrapy.Field()
    recTags = scrapy.Field()
    recProperty = scrapy.Field()
    userType = scrapy.Field()
    recId = scrapy.Field()
    keyUnits = scrapy.Field()
    city = scrapy.Field()
    # content = scrapy.Field()
    location = scrapy.Field()