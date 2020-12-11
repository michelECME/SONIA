package com.etecsa.cu.web.rest;

import com.etecsa.cu.domain.Ropa;
import com.etecsa.cu.repository.RopaRepository;
import com.etecsa.cu.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.etecsa.cu.domain.Ropa}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RopaResource {

    private final Logger log = LoggerFactory.getLogger(RopaResource.class);

    private static final String ENTITY_NAME = "ropa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RopaRepository ropaRepository;

    public RopaResource(RopaRepository ropaRepository) {
        this.ropaRepository = ropaRepository;
    }

    /**
     * {@code POST  /ropas} : Create a new ropa.
     *
     * @param ropa the ropa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ropa, or with status {@code 400 (Bad Request)} if the ropa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ropas")
    public ResponseEntity<Ropa> createRopa(@RequestBody Ropa ropa) throws URISyntaxException {
        log.debug("REST request to save Ropa : {}", ropa);
        if (ropa.getId() != null) {
            throw new BadRequestAlertException("A new ropa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ropa result = ropaRepository.save(ropa);
        return ResponseEntity.created(new URI("/api/ropas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ropas} : Updates an existing ropa.
     *
     * @param ropa the ropa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ropa,
     * or with status {@code 400 (Bad Request)} if the ropa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ropa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ropas")
    public ResponseEntity<Ropa> updateRopa(@RequestBody Ropa ropa) throws URISyntaxException {
        log.debug("REST request to update Ropa : {}", ropa);
        if (ropa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ropa result = ropaRepository.save(ropa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ropa.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ropas} : get all the ropas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ropas in body.
     */
    @GetMapping("/ropas")
    public List<Ropa> getAllRopas() {
        log.debug("REST request to get all Ropas");
        return ropaRepository.findAll();
    }

    /**
     * {@code GET  /ropas/:id} : get the "id" ropa.
     *
     * @param id the id of the ropa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ropa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ropas/{id}")
    public ResponseEntity<Ropa> getRopa(@PathVariable Long id) {
        log.debug("REST request to get Ropa : {}", id);
        Optional<Ropa> ropa = ropaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ropa);
    }

    /**
     * {@code DELETE  /ropas/:id} : delete the "id" ropa.
     *
     * @param id the id of the ropa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ropas/{id}")
    public ResponseEntity<Void> deleteRopa(@PathVariable Long id) {
        log.debug("REST request to delete Ropa : {}", id);
        ropaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
