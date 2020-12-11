package com.etecsa.cu;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.etecsa.cu");

        noClasses()
            .that()
            .resideInAnyPackage("com.etecsa.cu.service..")
            .or()
            .resideInAnyPackage("com.etecsa.cu.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.etecsa.cu.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
