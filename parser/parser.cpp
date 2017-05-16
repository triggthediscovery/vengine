#include <iostream>
#include <string>
#include <fstream>
#include <streambuf>
#include <stdlib.h>
#include <vector>

using namespace std;

struct V3{
    float x;
    float y;
    float z;
};

struct POLY {
    int p1;
    int p2;
    int p3;
    V3 norm;
    V3 col;
};

struct POLYE {
    V3 pos;
    V3 norm;
    V3 col;
};

int main(int argc, char * argv[]) {
    ifstream t(argv[1]);
	string SrcFile((istreambuf_iterator<char>(t)),
                    istreambuf_iterator<char>());
                    
    float ptx, pty, ptz;
            
    string hold = "";

    vector<POLYE> polyes;
    vector<POLY> polys;
    vector<V3> verts;
    
    V3 tpt, nrm, rgb;
    POLY tpoly;
    POLYE tpolye;
    
    int vertn = SrcFile.find("element vertex") + 15;
    int polyn = SrcFile.find("element face") + 13;
    
    int vertne = vertn;
    int polyne = polyn;
    
    while (SrcFile[vertne] != '\n') vertne++;
    while (SrcFile[polyne] != '\n') polyne++;
    
    hold = SrcFile.substr(vertn,vertne-vertn);
    vertn = atoi(hold.c_str());
    
    hold = SrcFile.substr(polyn,polyne-polyn);
    polyn = atoi(hold.c_str());
    
    //cout << vertn << '\n';
    //cout << polyn << '\n';
    
    int begin = SrcFile.find("end_header");
    
    while (SrcFile[begin] != '\n')  begin++;
    
    begin++;
                  
    int i=begin;
    
    while (vertn>0) {
        vertn--;
    
        int start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);

        tpt.x = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);
        
        tpt.y = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);

        tpt.z = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);

        nrm.x = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);
        
        nrm.y = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);

        nrm.z = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);

        rgb.x = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);
        
        rgb.y = atof(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != '\n') start++;
        
        hold = SrcFile.substr(i,start-i);

        rgb.z = atof(hold.c_str());
        
        i = start;
        
        //cout << tpt.x << ' ' << tpt.y << ' ' << tpt.z << '\n';
        //cout << nrm.x << ' ' << nrm.y << ' ' << nrm.z << '\n';
        //cout << rgb.x << ' ' << rgb.y << ' ' << rgb.z << '\n';
        
        tpolye.pos = tpt;
        tpolye.norm = nrm;
        tpolye.col = rgb;
        
        polyes.push_back(tpolye);
    }
    
    //cout << SrcFile.substr(i);
    
    int kill;
    
    while (polyn>0) {
        polyn--;
    
        int start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);

        kill = atoi(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);
        
        tpoly.p1 = atoi(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != ' ') start++;
        
        hold = SrcFile.substr(i,start-i);

        tpoly.p2 = atoi(hold.c_str());
        
        i = start+1;
        
        start=i;
        
        while (SrcFile[start] != '\n') start++;
        
        hold = SrcFile.substr(i,start-i);

        tpoly.p3 = atoi(hold.c_str());
        
        i = start;
        
        //cout << tpoly.p1 << ' ' << tpoly.p2 << ' ' << tpoly.p3 << '\n';
        
        //cout << tpoly.p1 << '\n';
        
        tpoly.norm = polyes[tpoly.p1].norm;
        tpoly.col = polyes[tpoly.p1].col;
        
        polys.push_back(tpoly);
    }
    
    for (int i=0; i<polyes.size(); i++) {
        verts.push_back(polyes[i].pos);
    }
    
    
    string OutFile = "";
    
    OutFile += "var Verts = [";

    for (int i=0; i<verts.size(); i++) {
        OutFile += "[";
        OutFile += to_string(verts[i].x);
        OutFile += ", ";
        OutFile += to_string(verts[i].y);
        OutFile += ", ";
        OutFile += to_string(verts[i].z);
        OutFile += "]";
        
        if (i != (verts.size()-1)) {
            OutFile += ", ";
        }
    }
    
    OutFile += "];\n";
    
    OutFile += "var Polys = [";

    for (int i=0; i<polys.size(); i++) {
        int r, g, b;
    
        r = (int)polys[i].col.x;
        g = (int)polys[i].col.y;
        b = (int)polys[i].col.z;
    
        char p1 = 0, p2 = 0;
        string color = "#";
    
        while (r>=16) {
            p1++;
            r-=16;
        }
        
        p2 = r;

        if (p1<10) color += '0' + p1; else color += 'A' + p1 - 10; 
        if (p2<10) color += '0' + p2; else color += 'A' + p2 - 10; 
        
        p1=0;
        
        while (g>=16) {
            p1++;
            g-=16;
        }
        
        p2 = g;

        if (p1<10) color += '0' + p1; else color += 'A' + p1 - 10; 
        if (p2<10) color += '0' + p2; else color += 'A' + p2 - 10; 
        
        p1=0;
        
        while (b>=16) {
            p1++;
            b-=16;
        }
        
        p2 = b;

        if (p1<10) color += '0' + p1; else color += 'A' + p1 - 10; 
        if (p2<10) color += '0' + p2; else color += 'A' + p2 - 10; 
        
        //cout << (int)polys[i].col.x << ' ' << (int)polys[i].col.y << ' ' << (int)polys[i].col.z << ' ' << color << '\n'; 
        
    
        OutFile += "[";
        OutFile += to_string(polys[i].p1);
        OutFile += ", ";
        OutFile += to_string(polys[i].p2);
        OutFile += ", ";
        OutFile += to_string(polys[i].p3);
        OutFile += ", ";
        OutFile += to_string(polys[i].norm.x);
        OutFile += ", ";
        OutFile += to_string(polys[i].norm.y);
        OutFile += ", ";
        OutFile += to_string(polys[i].norm.z);
        OutFile += ", '";
        OutFile += color;
        OutFile += "']";
        
        if (i != (polys.size()-1)) {
            OutFile += ", ";
        }
    }
    
    OutFile += "];\n";
    
    cout << OutFile;
    
}

















