#### cleaning data

import pandas as pd
import numpy as np

# reading files
# insee = pd.read_csv('data/insee_data.gzip', sep=";", compression='gzip')
insee = pd.read_csv('data/output.csv', sep=";")
insee["IRIS"] = insee["CODGEO"].astype(str)


# merging on INSEE
conso = pd.read_csv('data/ConsoJour.csv', 
	sep=";", 
	parse_dates=[1], 
	dtype={"ID": str, "vol":np.float, "IRIS":str}
	)

# conso["Y"] = conso["J"].map(lambda x: x.year) # lent

conso["Y"] = pd.DatetimeIndex(conso['J']).year # rapide
conso["Y"] = conso["Y"].astype('int32')
conso2013 = conso[conso.Y == 2013]


del conso

# conso[conso["vol"].isnull()]

total_conso = conso2013[["IRIS","vol"]].groupby("IRIS", as_index=False).sum()

data = pd.merge(total_conso, insee, how="left", on="IRIS")

data.index = data.IRIS

data = data.drop(data.columns[2:10], axis=1)
data.drop("IRIS", axis=1, inplace=True)
# data = data.dropna()
data.dropna(inplace = True)

X = data.drop("vol", axis=1)
Y = data["vol"]


##### model creation

from sklearn.ensemble import RandomForestRegressor
from sklearn.cross_validation import train_test_split
from sklearn.metrics import mean_squared_error
from scipy.stats import pearsonr

X_train, X_test, y_train, y_test = train_test_split(X,
                                                    Y,
                                                    test_size=0.2,
                                                    random_state=1)


predictor = RandomForestRegressor(n_estimators=1000, max_depth=100)

predictor.fit(X_train, y_train)



# analyse du resultat

y_pred = predictor.predict(X_test)

rmse = mean_squared_error(y_test, y_pred)
print('RMSE: %.4f' % rmse)
pea = pearsonr(y_test, y_pred)
print('PEA: %.4f' % pea[0])


import matplotlib.pyplot as plt

indices = np.argsort(predictor.feature_importances_)

names = X.columns

plt.barh(np.arange(len(names)), predictor.feature_importances_[indices])
plt.yticks(np.arange(len(names)) + 0.25, np.array(names)[indices])
plt.xlabel('Relative importance')
plt.show()


