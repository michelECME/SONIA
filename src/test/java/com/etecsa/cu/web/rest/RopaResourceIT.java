package com.etecsa.cu.web.rest;

import com.etecsa.cu.SoniaTestApp;
import com.etecsa.cu.domain.Ropa;
import com.etecsa.cu.repository.RopaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.etecsa.cu.domain.enumeration.Color;
/**
 * Integration tests for the {@link RopaResource} REST controller.
 */
@SpringBootTest(classes = SoniaTestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RopaResourceIT {

    private static final String DEFAULT_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_MARCA = "BBBBBBBBBB";

    private static final String DEFAULT_TALLA = "AAAAAAAAAA";
    private static final String UPDATED_TALLA = "BBBBBBBBBB";

    private static final String DEFAULT_TELA = "AAAAAAAAAA";
    private static final String UPDATED_TELA = "BBBBBBBBBB";

    private static final Color DEFAULT_COLOR = Color.ROJO;
    private static final Color UPDATED_COLOR = Color.AZUL;

    @Autowired
    private RopaRepository ropaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRopaMockMvc;

    private Ropa ropa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ropa createEntity(EntityManager em) {
        Ropa ropa = new Ropa()
            .marca(DEFAULT_MARCA)
            .talla(DEFAULT_TALLA)
            .tela(DEFAULT_TELA)
            .color(DEFAULT_COLOR);
        return ropa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ropa createUpdatedEntity(EntityManager em) {
        Ropa ropa = new Ropa()
            .marca(UPDATED_MARCA)
            .talla(UPDATED_TALLA)
            .tela(UPDATED_TELA)
            .color(UPDATED_COLOR);
        return ropa;
    }

    @BeforeEach
    public void initTest() {
        ropa = createEntity(em);
    }

    @Test
    @Transactional
    public void createRopa() throws Exception {
        int databaseSizeBeforeCreate = ropaRepository.findAll().size();
        // Create the Ropa
        restRopaMockMvc.perform(post("/api/ropas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ropa)))
            .andExpect(status().isCreated());

        // Validate the Ropa in the database
        List<Ropa> ropaList = ropaRepository.findAll();
        assertThat(ropaList).hasSize(databaseSizeBeforeCreate + 1);
        Ropa testRopa = ropaList.get(ropaList.size() - 1);
        assertThat(testRopa.getMarca()).isEqualTo(DEFAULT_MARCA);
        assertThat(testRopa.getTalla()).isEqualTo(DEFAULT_TALLA);
        assertThat(testRopa.getTela()).isEqualTo(DEFAULT_TELA);
        assertThat(testRopa.getColor()).isEqualTo(DEFAULT_COLOR);
    }

    @Test
    @Transactional
    public void createRopaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ropaRepository.findAll().size();

        // Create the Ropa with an existing ID
        ropa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRopaMockMvc.perform(post("/api/ropas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ropa)))
            .andExpect(status().isBadRequest());

        // Validate the Ropa in the database
        List<Ropa> ropaList = ropaRepository.findAll();
        assertThat(ropaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRopas() throws Exception {
        // Initialize the database
        ropaRepository.saveAndFlush(ropa);

        // Get all the ropaList
        restRopaMockMvc.perform(get("/api/ropas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ropa.getId().intValue())))
            .andExpect(jsonPath("$.[*].marca").value(hasItem(DEFAULT_MARCA)))
            .andExpect(jsonPath("$.[*].talla").value(hasItem(DEFAULT_TALLA)))
            .andExpect(jsonPath("$.[*].tela").value(hasItem(DEFAULT_TELA)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())));
    }
    
    @Test
    @Transactional
    public void getRopa() throws Exception {
        // Initialize the database
        ropaRepository.saveAndFlush(ropa);

        // Get the ropa
        restRopaMockMvc.perform(get("/api/ropas/{id}", ropa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ropa.getId().intValue()))
            .andExpect(jsonPath("$.marca").value(DEFAULT_MARCA))
            .andExpect(jsonPath("$.talla").value(DEFAULT_TALLA))
            .andExpect(jsonPath("$.tela").value(DEFAULT_TELA))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRopa() throws Exception {
        // Get the ropa
        restRopaMockMvc.perform(get("/api/ropas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRopa() throws Exception {
        // Initialize the database
        ropaRepository.saveAndFlush(ropa);

        int databaseSizeBeforeUpdate = ropaRepository.findAll().size();

        // Update the ropa
        Ropa updatedRopa = ropaRepository.findById(ropa.getId()).get();
        // Disconnect from session so that the updates on updatedRopa are not directly saved in db
        em.detach(updatedRopa);
        updatedRopa
            .marca(UPDATED_MARCA)
            .talla(UPDATED_TALLA)
            .tela(UPDATED_TELA)
            .color(UPDATED_COLOR);

        restRopaMockMvc.perform(put("/api/ropas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRopa)))
            .andExpect(status().isOk());

        // Validate the Ropa in the database
        List<Ropa> ropaList = ropaRepository.findAll();
        assertThat(ropaList).hasSize(databaseSizeBeforeUpdate);
        Ropa testRopa = ropaList.get(ropaList.size() - 1);
        assertThat(testRopa.getMarca()).isEqualTo(UPDATED_MARCA);
        assertThat(testRopa.getTalla()).isEqualTo(UPDATED_TALLA);
        assertThat(testRopa.getTela()).isEqualTo(UPDATED_TELA);
        assertThat(testRopa.getColor()).isEqualTo(UPDATED_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingRopa() throws Exception {
        int databaseSizeBeforeUpdate = ropaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRopaMockMvc.perform(put("/api/ropas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ropa)))
            .andExpect(status().isBadRequest());

        // Validate the Ropa in the database
        List<Ropa> ropaList = ropaRepository.findAll();
        assertThat(ropaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRopa() throws Exception {
        // Initialize the database
        ropaRepository.saveAndFlush(ropa);

        int databaseSizeBeforeDelete = ropaRepository.findAll().size();

        // Delete the ropa
        restRopaMockMvc.perform(delete("/api/ropas/{id}", ropa.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ropa> ropaList = ropaRepository.findAll();
        assertThat(ropaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
