# -*- coding: utf-8 -*-

import sklearn
import json

def makeJsonTree(decision_tree, feature_names=None):
 
  def node_to_str(tree, node_id, criterion):
    if not isinstance(criterion, sklearn.tree.tree.six.string_types):
      criterion = "impurity"
 
    value = tree.value[node_id]
    if tree.n_outputs == 1:
      value = value[0, :]
 
    if tree.children_left[node_id] == sklearn.tree._tree.TREE_LEAF:
      return {"name": node_id, "criterion": criterion, "impurity": tree.impurity[node_id], "samples": tree.n_node_samples[node_id], "value": list(value)}
    else:
      if feature_names is not None:
        feature = feature_names[tree.feature[node_id]]
      else:
        feature = tree.feature[node_id]
 
      return {"name": node_id, "rule": "%s <= %.4f" % (feature, tree.threshold[node_id]), "%s" % criterion: tree.impurity[node_id], "samples": tree.n_node_samples[node_id]}

 
  def recurse(tree, node_id, criterion, parent=None, depth=0):
 
    left_child = tree.children_left[node_id]
    right_child = tree.children_right[node_id]

    if left_child != sklearn.tree._tree.TREE_LEAF and depth < 6:
      # left child is the one where the answer of rule is yes.
      return dict(
        node_to_str(tree, node_id, criterion).items()
        +
        {
          "children": [recurse(tree, left_child, criterion, node_id, depth+1), recurse(tree, right_child, criterion, node_id, depth+1)]
        }.items())

    else:
      return dict(
        node_to_str(tree, node_id, criterion).items()
        +
        {
          "children": []
        }.items())

 
 
  if isinstance(decision_tree, sklearn.tree.tree.Tree):
    js = recurse(decision_tree, 0, criterion="impurity")
  else:
    js = recurse(decision_tree.tree_, 0, criterion=decision_tree.criterion)

  return json.dumps([js])
 