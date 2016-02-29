import org.apache.spark._
import org.apache.spark.graphx._
import org.apache.spark.rdd.RDD


val graph = GraphLoader.edgeListFile(sc, "file:///data/exercices/pagerank/followers.txt")

val ranks = graph.pageRank(0.0001).vertices

// Join the ranks with the usernames
val users = sc.textFile("file:///data/exercices/pagerank/users.txt").map { line =>
  val fields = line.split(",")
  (fields(0).toLong, fields(1))
}
val ranksByUsername = users.join(ranks).map {
  case (id, (username, rank)) => (username, rank)
}
// Print the result
println(ranksByUsername.collect().mkString("\n"))