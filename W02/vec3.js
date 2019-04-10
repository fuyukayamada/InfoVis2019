// Constructor
Vec3 = function(x, y, z)
{
this.x = x;
this.y = y;
this.z = z;
}

// Add method
Vec3.prototype.add = function( v )
{
this.x += v.x;
this.y += v.y;
this.z += v.z;
return this;
}

// Sum method
Vec3.prototype.sum = function()
{
return this.x + this.y + this.z;
}

Vec3.prototype.min = function()
{
var sort = sorted();
return sort[2];
}

Vec3.prototype.mid = function()
{
var sort = sorted();
return sort[1];
}

Vec3.prototype.max = function()
{
var sort = sorted();
return sort[0];
}

function sorted()
{
    var sort = [];
    if (this.x >= this.y)
    {
        if (this.x >= this.z) //max = x
        {
            if(this.y >= this.z) //mid = y
            {
                sort = [this.x, this.y, this.z];
            }
            else //mid = z
            {
                sort = [this.x, this.z, this.y];
            }
        }
        else //max = z
        {
            if (this.x >= this.y) //mid = x
            {
                sort = [this.z, this.x, this.y];
            }
            else //mid = y
            {
                sort = [this.z, this.y, this.x];
            }
        }
    }
    else // x < y
    {
        if (this.y >= this.z) //max = y
        {
            if(this.x >= this.z) //mid = x
            {
                sort = [this.y, this.x, this.z];
            }
            else //mid = z
            {
                sort = [this.y, this.z, this.x];
            }
        }
    }
return sort;
}
