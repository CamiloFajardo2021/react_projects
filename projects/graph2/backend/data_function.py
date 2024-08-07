import pandas as pd
import networkx as nx
import numpy as np
import json

filepath = 'backend\data.csv'

def filter_d(arg):
    DF = pd.read_csv(filepath)
    DF = DF[DF['name']==arg]
    return list(DF['name']),list(DF['edad'])

def call_network(arg):
    if arg=='erdos':
        G = nx.gnm_random_graph(100,200)
    elif arg=='barabasi':
        G = nx.barabasi_albert_graph(n=100,m=2)
    return G

"""
formato graphs graphology
{
  attributes: {name: 'My Graph'},
  nodes: [{key: 'Thomas',attributes:{'att1':att1}}, {key: 'Eric'}],
  edges: [{source: 'Thomas', target: 'Eric'}]
}

->
nodes = [{key:u} for u in G.nodes()]
edges = [{source:u,target:v,d} for (u,v,d) in G.edges(data=True)]
json_graph = {attributes:{name:'My Graph'},nodes:nodes,edges:edges}
"""

def to_json(G):
    #without attributes

    #test atributes
    entropy = {u:d for (u,d) in G.degree()}
    clustering =  nx.clustering(G)
    pos = nx.spring_layout(G)
    nodes = [{'key':u,'attributes':{'x':pos[u][0],'y':pos[u][1],'label':str(u),'entropy':entropy[u],'clustering':clustering[u]}} for u in G.nodes()]
    edges = [{'source':u,'target':v} for (u,v) in G.edges()]
    json_graph = {'attributes':{'name':'My Graph'},'nodes':nodes,'edges':edges}
    return json_graph

print(to_json(call_network('erdos')))
