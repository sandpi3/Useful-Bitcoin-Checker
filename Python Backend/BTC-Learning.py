import pandas as pd
import sklearn
import numpy as np
import quandl
import matplotlib.pyplot as plt, mpld3
import datetime as dt
from sklearn import model_selection
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
import time
from pandas.plotting import scatter_matrix


quandl.ApiConfig.api_key = "6s9GSsp_m385xDX9Rp9B"

def get_data(export_data=False, print_data=False):
    df_train = quandl.get('BCHARTS/BITSTAMPUSD', start_date=dt.datetime(2016, 1, 1), end_date=dt.datetime(2017, 1, 1))
    df_test = quandl.get('BCHARTS/BITSTAMPUSD', start_date=dt.datetime(2017, 1, 2))
    df_train.drop(['High', 'Low', 'Weighted Price', 'Volume (Currency)'], 1, inplace=True)
    df_test.drop(['High', 'Low', 'Weighted Price', 'Volume (Currency)'], 1, inplace=True)
    if print_data:
        print('\n Training Data \n')
        print(df_train.tail(1))
        print('\n Test Data \n')
        print(df_test.tail(1))
    else:
        pass
    if export_data:
        df_train.to_csv('Training_data.csv')
        df_test.to_csv('Test_data.csv')
    else:
        pass

def plot_data():
    get_data(export_data=False, print_data=False)
    df_train = pd.read_csv('Training_data.csv', index_col=0, parse_dates=True)
    df_test = pd.read_csv('Test_data.csv', parse_dates=True, index_col=0)
    df = quandl.get('BCHARTS/BITSTAMPUSD', start_date=dt.datetime(2017, 1, 2))
    df.drop(['High', 'Low', 'Weighted Price', 'Volume (Currency)'], 1, inplace=True)
    plt.legend(loc='upper left')
    df_graph = df['Volume (BTC)']
    df_graph.to_csv('Volume_Data.csv')
    plt.plot(df_graph)
    plt.show()


dt.datetime.timedelta(days=5)
def learning():
    # df_train = pd.read_csv('Training_data.csv', parse_dates=True, index_col=0)
    # df_test = pd.read_csv('Test_data.csv', parse_dates=True, index_col=0)
    # Load dataset
    dataset = pd.read_csv('Training_data.csv', index_col=0, parse_dates=True)
    df = pd.DataFrame(dataset).astype(np.int64)
    # scatter_matrix(df)
    # plt.show()
    array = df.values
    X = array[:,0:3]
    Y = array[:,2]
    validation_size = 0.20
    seed = 7
    X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(X, Y, test_size=validation_size, random_state=seed)
    
    seed = 7
    scoring = 'accuracy'

    models = []
    models.append(('LR', LogisticRegression()))
    models.append(('LDA', LinearDiscriminantAnalysis()))
    models.append(('KNN', KNeighborsClassifier()))
    models.append(('CART', DecisionTreeClassifier()))
    models.append(('NB', GaussianNB()))
    models.append(('SVM', SVC()))
    # evaluate each model in turn
    results = []
    names = []
    for name, model in models:
        kfold = model_selection.KFold(n_splits=10, random_state=seed)
        cv_results = model_selection.cross_val_score(model, X_train, Y_train, cv=kfold, scoring=scoring)
        results.append(cv_results)
        names.append(name)
        msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
        print(msg)

    # kb = GaussianNB()
    # kb.fit(X_train, Y_train)
    # predictions = kb.predict(X_validation)
    # print(accuracy_score(Y_validation, predictions))
    # print(confusion_matrix(Y_validation, predictions))
    # print(classification_report(Y_validation, predictions))



# get_data()
# plot_data()
# get_data(export_data=True)
plot_data()