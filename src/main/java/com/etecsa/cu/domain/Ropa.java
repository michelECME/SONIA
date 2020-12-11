package com.etecsa.cu.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.etecsa.cu.domain.enumeration.Color;

/**
 * A Ropa.
 */
@Entity
@Table(name = "ropa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ropa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "marca")
    private String marca;

    @Column(name = "talla")
    private String talla;

    @Column(name = "tela")
    private String tela;

    @Enumerated(EnumType.STRING)
    @Column(name = "color")
    private Color color;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public Ropa marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getTalla() {
        return talla;
    }

    public Ropa talla(String talla) {
        this.talla = talla;
        return this;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    public String getTela() {
        return tela;
    }

    public Ropa tela(String tela) {
        this.tela = tela;
        return this;
    }

    public void setTela(String tela) {
        this.tela = tela;
    }

    public Color getColor() {
        return color;
    }

    public Ropa color(Color color) {
        this.color = color;
        return this;
    }

    public void setColor(Color color) {
        this.color = color;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ropa)) {
            return false;
        }
        return id != null && id.equals(((Ropa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ropa{" +
            "id=" + getId() +
            ", marca='" + getMarca() + "'" +
            ", talla='" + getTalla() + "'" +
            ", tela='" + getTela() + "'" +
            ", color='" + getColor() + "'" +
            "}";
    }
}
