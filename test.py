# from datetime import datetime as dt
from datetime import datetime, timedelta
# date = datetime.datetime.now() -> dt.now()
# from time import localtime as lt
# time = time.localtime() -> lt()
import time

# 요일 표시하는 법은?

# date = datetime.now().minute
# print(date)
# date_to = datetime.today().second
# print(date_to)
# # print(date == date_to)
#
# yesterday = datetime.today() - timedelta(1)
# print(yesterday)
# print(yesterday.strftime("%Y-%m-%d"))

# date = datetime.today()
# print(date)
#
# time = time.localtime()
# print(list(time)[0:3])

# time = lt()
# print(list(lt())[0:3])
# print(time)
# print(list(time))
# # print(dict(time))
# print(list(time)[0:3])


# test = {
#     "a": 1,
#     "b": 2,
#     "c": 3
# }
# # print(test)
# list1 = ["a", "b", "c"]
# # print(len(list1))
# list2 = [1, 2, 3]
# dict1 = {}
# # print(dict1)
# for i in range(0, int(len(list1))):
#     dict1[list1[i]] = list2[i]
# # dict1 = {
# #     list1: list2
# # }
# print(dict1)
# print(test == dict1)
# print(list(dict1))
# print(dict1.items())
# print(list(dict1.items()))

# print(dict1)

# for dic in dict1:
#     print(dic, dict1)

# test1 = {"a": "y"}
# test2 = [{"a": "x"}, {"a": "y"}, {"a": "z"}]
# test3 = [{"b": 10}, {"b": 20}, {"b": 30}]
# if test1 in test2:
#     print("true")
# else:
#     print("false")
#
# print(test2.index(test1))
# print(list(test3[test2.index(test1)].values())[0])
# print(list(all_db_date[all_db_k_name.index(k_name_dictionary)].values())[0])

# all_db_k_name.index(k_name_dictionary) <= len(all_db_date)

# a = "6"
# num = []
# for i in range(1, int(a) - 1):
#     num.append(i)
# print(num)

# test5 = {"a": 1}
# test4 = [{"a": 1}, {"b": 2}, {"a": 3}]
# print(test4.index(test5))

for i in range(10, 0, -1):
    print(i)
