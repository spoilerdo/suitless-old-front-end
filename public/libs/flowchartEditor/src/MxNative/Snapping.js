/**
 * Code inspired by mxGraph's github examples: 
 * https://jgraph.github.io/mxgraph/javascript/examples/fixedpoints.html
 * @author Martijn Dormans
 * @version 1.0
 * @since 12-03-2019
 */

 /**
  * When drawing a line this code will look for the shortest connection point
  * @param {object} pt point
  * @param {object} t this
  */
export function snapToFixedPoint(pt, t) {
    if (pt != null && t.previous != null) {
        var constraints = t.graph.getAllConnectionConstraints(t.previous);
        var nearestConstraint = null;
        var dist = null;
    
        for (var i = 0; i < constraints.length; i++)
        {
            var cp = t.graph.getConnectionPoint(t.previous, constraints[i]);
            
            if (cp != null)
            {
                //Stelling van pyta
                var tmp = (cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

                if (dist == null || tmp < dist)
                {
                    nearestConstraint = constraints[i];
                    dist = tmp;
                }
            }
        }
        
        if (nearestConstraint != null)
        {
            t.sourceConstraint = nearestConstraint;
        }

        return nearestConstraint;
        
        // In case the edge style must be changed during the preview:
        // this.edgeState.style['edgeStyle'] = 'orthogonalEdgeStyle';
        // And to use the new edge style in the new edge inserted into the graph,
        // update the cell style as follows:
        //this.edgeState.cell.style = mxUtils.setStyle(this.edgeState.cell.style, 'edgeStyle', this.edgeState.style['edgeStyle']);
    }
}