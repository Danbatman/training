import org.apache.spark.graphx._
import org.apache.spark.rdd.RDD
import scala.util.MurmurHash

// http://stat-computing.org/dataexpo/2009/the-data.html
val textFile = sc.textFile("file:///data/2008.csv")
val name2col = textFile.first().split(",").zipWithIndex.map({case (value,index) => (value -> index)}).toMap


val airportCodes = textFile.
    map(line => line.split(",")).
    filter(entries => (entries(name2col("Year")) != "Year")).
    flatMap(entries => {
        Iterable(entries(name2col("Origin")).toString, entries(name2col("Dest")).toString)
    });

val airportVertices: RDD[(VertexId, String)] = airportCodes.distinct().map(x => (MurmurHash.stringHash(x), x))
val defaultAirport = ("Missing")


val flightEdges = textFile.
    map(line => line.split(",")).
    filter(entries => (entries(name2col("Year")) != "Year")).
    flatMap(entries => {
        try {
            Some(((MurmurHash.stringHash(entries(name2col("Origin")).toString),MurmurHash.stringHash(entries(name2col("Dest")).toString)), 1))
        } catch {
            case e : Exception =>
            println("error in date parsing")
            None
        }
    }).
    reduceByKey(_+_).
    map(x => Edge(x._1._1, x._1._2,x._2));





// val df_1 = sqlContext.read.format("com.databricks.spark.csv").option("header", "true").load("/data/2008.csv")


// val flightsFromTo = df_1.select($"Origin",$"Dest")
// val airportCodes = df_1.select($"Origin", $"Dest").flatMap(x => Iterable(x(0).toString, x(1).toString))


// val airportVertices: RDD[(VertexId, String)] = airportCodes.distinct().map(x => (MurmurHash.stringHash(x), x))
// val defaultAirport = ("Missing")


// val flightEdges = flightsFromTo.map(x =>
//     ((MurmurHash.stringHash(x(0).toString),MurmurHash.stringHash(x(1).toString)), 1)).reduceByKey(_+_).map(x => Edge(x._1._1, x._1._2,x._2))


val graph = Graph(airportVertices, flightEdges, defaultAirport)
graph.persist()

graph.numVertices
graph.numEdges


 // top 10 flights from airport to airport
graph.triplets.
    sortBy(_.attr, ascending=false).
    map(triplet =>
        "There were " + triplet.attr.toString + " flights from " + triplet.srcAttr + " to " + triplet.dstAttr + "."
    ).take(10);

// what airport has the most in degrees or unique flights into it?
graph.inDegrees.
    join(airportVertices).
    sortBy(_._2._1, ascending=false).
    take(1);

// pagerank
val ranks = graph.pageRank(0.0001).vertices
val ranksAndAirports = ranks.join(airportVertices).
    sortBy(_._2._1, ascending=false).
    map(_._2._2);

ranksAndAirports.take(10)



