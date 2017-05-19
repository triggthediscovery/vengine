function Scene(lights) {
    this.lights = lights;
    
    function getLum(x, y, z, nx, ny, nz) {
        var retArr = [0,0,0];
        
        for (var i=0; i<lights.length; i++) {
            lights[i].getLum(x, y, z, nx, ny, nz, retArr);
        }
        
        return retArr;
    }
    
    this.getLum = getLum;
}
