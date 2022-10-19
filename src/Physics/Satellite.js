import * as THREE from 'three'




class Sattalite {

    constructor(
        position,
        position_Erath,
        gravity_constant,
        drag_coeff,
        sp,
        roo
    ) {
        this.position = position

        this.sp = sp
        this.velocity = new THREE.Vector3(-this.sp, 0, 1)
        console.log("asdfghtghgfv", this.velocity);
        this.gravity_constant = gravity_constant
        this.Sattalite_x = position.x
        this.Sattalite_y = position.y
        this.Sattalite_z = -position.z
        this.Erath_x = position_Erath.x
        this.Erath_y = position_Erath.y
        this.Erath_z = position_Erath.z
        this.atmo_rho = 100
        this.drag_coeff = drag_coeff
        this.area = Math.PI * 6400 * 6400
        this.roo = roo
    }
    update(deltatime, Addtoinsp, Earth_Mass, Satllite_mass) {
        this.velocity.x *= Addtoinsp
        this.velocity.y *= Addtoinsp
        this.velocity.z *= Addtoinsp
        this.direction()
        let AR = this.Atmospheric_resistance()
            // console.log("speeed", this.velocity)
            // let drag_force = this.drag_force(this.atmo_rho)
        let gravity_force = this.gravity_force(Earth_Mass, Satllite_mass)
        var des = this.clculat_destance(this.position.x, this.position.y, this.position.z)
        let total_force
            // if ((des / 1000000) <= 40) {
            //     total_force = new THREE.Vector3(
            //         gravity_force.x + AR.x, //+ drag_force.x,
            //         gravity_force.y + AR.y, //+ drag_force.y,
            //         gravity_force.z + AR.z, //+ drag_force.z,
            //     )

        // } else {
        total_force = new THREE.Vector3(
                gravity_force.x,
                gravity_force.y,
                gravity_force.z,
            )
            // }
            // console.log("total_force", total_force)
        let a = new THREE.Vector3(
            total_force.x / Satllite_mass,
            total_force.y / Satllite_mass,
            total_force.z / Satllite_mass,
        )
        console.log("a", a)
        this.velocity.x += a.x * deltatime
        this.velocity.y += a.y * deltatime
        this.velocity.z += a.z * deltatime
            // console.log("velocity", this.velocity)

        // // this.position
        let p = new THREE.Vector3(
            this.velocity.x,
            this.velocity.y,
            this.velocity.z
        )


        var des = this.clculat_destance(this.position.x, this.position.y, this.position.z)
        console.log("des", des / 1000000)
        if ((des / 1000000) <= 13) {
            this.velocity.x = this.velocity.x / 100000000
            this.velocity.y -= 0
            this.velocity.z = this.velocity.z / 100000000

            // this.position.x = 9
        } else {
            this.position.x += p.x * deltatime
            this.position.y += p.y * deltatime
            this.position.z += p.z * deltatime

        }
        // console.log("physic.position.y", this.position.y)
        // console.log("physic.position.z", this.position.z)
    }
    clculat_destance(x, y, z) {
        var destance = Math.sqrt(Math.pow(x - this.Erath_x, 2) + Math.pow(y - this.Erath_y, 2) + Math.pow(z - this.Erath_z, 2))

        return destance
    }

    direction() {
        let v = new THREE.Vector3(this.position.x, this.position.y, this.position.z)

        this.Sattalite_x = -v.x
        this.Sattalite_y = -v.y
        this.Sattalite_z = -v.z
    }


    gravity_force(Earth_Mass, Satllite_mass) {

        let diraction = new THREE.Vector3(
            this.Sattalite_x,
            this.Sattalite_y,
            this.Sattalite_z
        )

        let one_diraction = diraction.normalize()
        let gravity_force = new THREE.Vector3(

            this.gravity_constant * Satllite_mass * Earth_Mass * one_diraction.x / this.Sattalite_x * this.Sattalite_x,
            0,
            this.gravity_constant * Satllite_mass * Earth_Mass * one_diraction.z / this.Sattalite_z * this.Sattalite_z,
        )

        return gravity_force
    }

    Atmospheric_resistance() {
        let temp1 = this.velocity.clone()
        let sp = temp1.lengthSq() / 1000000000000000
        let temp2 = this.velocity.clone()
        let temp = temp2.normalize()
        let Drag = new THREE.Vector3(-(sp / 2) * this.drag_coeff * this.roo * this.area * temp.x,
            0, -(sp / 2) * this.drag_coeff * this.roo * this.area * temp.z, )
        console.log("Drag", Drag)
        console.log("this.roo  ", this.roo)
        Drag.x = Drag.x / 1000
        Drag.y = Drag.y / 1000
        Drag.z = Drag.z / 1000
        return Drag
    }
}

export default Sattalite;