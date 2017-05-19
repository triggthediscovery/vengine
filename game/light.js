function Light(mx, my, mz, ramt, gamt, bamt, dist) {
    this.x = mx;
    this.y = my;
    this.z = mz;
    this.ramt = ramt;
    this.gamt = gamt;
    this.bamt = bamt;
    this.dist = dist;
    
    function getLum(x, y, z, nx, ny, nz, arr) {
        var dx = x-this.x;
        var dy = y-this.y; 
        var dz = z-this.z;
        
        var ddist = Math.sqrt((dx*dx)+(dy*dy)+(dz*dz));
        
        dx = dx/ddist;
        dy = dy/ddist;
        dz = dz/ddist; 
        
        var camt = Math.sqrt(((nx-dx)*(nx-dx)) + ((ny-dy)*(ny-dy)) + ((nz-dz)*(nz-dz)))/(ddist*ddist);
        
        camt = camt/this.dist; 

        arr[0] += (camt*this.ramt);
        arr[1] += (camt*this.gamt);
        arr[2] += (camt*this.bamt);
    }    
    
    this.getLum = getLum;
}
