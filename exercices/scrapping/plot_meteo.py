import pandas
import datetime
import pylab as plt

data = pandas.read_json("meteo.json", orient="records")

def mkDate(row):
	return datetime.datetime(int(row["year"]), int(row["month"]), int(row["day"]), int(row["hour"]))
data.index = data.apply(mkDate, axis = 1)


data["temperature"].plot()
plt.show()