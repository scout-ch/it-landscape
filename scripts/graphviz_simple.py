#!/usr/bin/python3

#
# read yml files from services dir and process it with graphviz
#

import os
import yaml
import graphviz

service_dir = os.path.dirname(os.path.abspath(__file__)) + '/../services'
data_dir = os.path.dirname(os.path.abspath(__file__)) + '/../data'

service_files = os.listdir(service_dir)

dot_data = {}

for f in service_files:
    # limit to yml files
    if not f.endswith('.yml'):
        continue
    # set filename
    base_name = os.path.splitext(f)[0]
    # open files
    with open(service_dir + '/' + f, 'r') as g:
        # is it yaml?
        try:
            data = yaml.safe_load(g)
        except yaml.YAMLError as exception:
            print(exception)
        # add file content
        dot_data[base_name] = data

# create graphviz intance
g = graphviz.Digraph(data_dir + '/it_services_graph', format='svg')

# iterate names from files
for i in dot_data:
    # set file data
    n = dot_data[i]
    # check if name is set
    if 'name' in n:
        node = g.node(i, label=n['name'])
    # otherwise use filename
    else:
        node = g.node(i)

    # check for dependencies
    if 'depends_on' in n and n['depends_on']:
        # search for denpendencies...
        for d in n['depends_on']:
            g.edge(i, d)

### do somesthing with your graphviz svg
## open with your default viewer
g.view()
## raw output
# print(g.pipe().decode('utf-8'))
