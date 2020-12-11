package com.etecsa.cu.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.etecsa.cu.web.rest.TestUtil;

public class RopaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ropa.class);
        Ropa ropa1 = new Ropa();
        ropa1.setId(1L);
        Ropa ropa2 = new Ropa();
        ropa2.setId(ropa1.getId());
        assertThat(ropa1).isEqualTo(ropa2);
        ropa2.setId(2L);
        assertThat(ropa1).isNotEqualTo(ropa2);
        ropa1.setId(null);
        assertThat(ropa1).isNotEqualTo(ropa2);
    }
}
